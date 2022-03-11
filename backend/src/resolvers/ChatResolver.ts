import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  PubSub,
  Subscription,
  Root,
  Publisher,
} from "type-graphql";
import { ChatRoom } from "../types/ChatRoom";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import {
  ProjectResponse,
  ContactResponse,
  ChatMessagesResponse,
} from "./responses/ChatResponse";
import { SearchArgs } from "./inputs/GlobalInputs";
import { pagination } from "../utils/pagination";
import { ForbiddenError, UserInputError } from "apollo-server-express";
import { Message } from "../types/Message";
import { ChatInput, CreateMessageInput } from "./inputs/ChatInput";
import { MessageValidationSchema } from "../validations/schemas";
import { MessageSubscribtionResponse } from "./responses/MessageResponse";
import { JwtPayload } from "jsonwebtoken";

// TODO: Queries/mutations/subscriptions to be implemented:
// projects:            Return all project chats - Done
// contacts:            Return all contact chats - Done
// projectMessages:     Return all messages by projectId - Done
// contactMessages:     Return all messages by contactId - Done
// projectAddMessage:   Creates a new message to project by projectId - Done
// contactAddMessage:   Creates a new message to contact by contactId - Done
// newMessage:          Checks for a new message in the active chat window (subscription)

@Resolver(ChatRoom)
export class ChatResolver {
  @Query(() => [ProjectResponse], {
    nullable: true,
    description: "Returns all project chats",
  })
  @UseMiddleware(isAuth)
  async projectChats(
    @Arg("data") { after, before, first, last }: SearchArgs,
    @Ctx() { payload, prisma }: Context
  ) {
    const projects = await prisma.project.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        members: {
          some: {
            userId: payload!.userId,
            status: "ACCEPTED",
          },
        },
        disabled: false,
      },
      orderBy: {
        latestMessageDate: "desc",
      },
      include: {
        members: {
          where: {
            userId: payload!.userId,
          },
          select: {
            readChatAt: true,
          },
        },
      },
    });

    const projectsWithNewMessages = await prisma.project
      .findMany({
        where: {
          OR: projects.map((item) => ({
            id: item.id,
            messages: {
              some: {
                userId: {
                  not: payload!.userId,
                },
                createdAt: {
                  gte: new Date(item.members[0].readChatAt),
                },
              },
            },
          })),
          disabled: false,
        },
        select: {
          id: true,
        },
      })
      .then((contacts) => contacts.map((item) => item.id));

    const result = projects.map((item) => {
      const found = projectsWithNewMessages.some((el) => item.id === el);
      return { ...item, newMessages: found };
    });

    return result;
  }

  @Query(() => [ContactResponse], {
    nullable: true,
    description: "Return all contact chats",
  })
  @UseMiddleware(isAuth)
  async contactChats(
    @Arg("data") { searchText, after, before, first, last }: SearchArgs,
    @Ctx() { payload, prisma }: Context
  ) {
    const filters = {};

    // Checks if there's any searchText if so apply that, else search all contacts for a certain user
    if (searchText) {
      Object.assign(filters, {
        OR: [
          {
            user: {
              profile: {
                fullName: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
            },
            contactId: payload!.userId,
          },
          {
            contact: {
              profile: {
                fullName: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
            },
            userId: payload!.userId,
          },
        ],
      });
    } else {
      Object.assign(filters, {
        OR: [
          {
            contactId: payload!.userId,
          },
          {
            userId: payload!.userId,
          },
        ],
      });
    }

    const contacts = await prisma.contact
      .findMany({
        ...pagination({ after, before, first, last }),
        where: {
          ...filters,
          status: "TRUE",
        },
        orderBy: {
          latestMessageDate: "desc",
        },
        select: {
          id: true,
          contactId: true,
          userId: true,
          contactReadChatAt: true,
          userReadChatAt: true,
          contact: {
            select: {
              id: true,
              profile: {
                include: {
                  discipline: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              profile: {
                include: {
                  discipline: true,
                },
              },
            },
          },
        },
      })
      .then((contacts) =>
        contacts.map((item) => {
          if (item.userId === payload!.userId) {
            return {
              id: item.id,
              user: item.contact,
              loggedInUserReadChatAt: item.userReadChatAt,
            };
          } else {
            return {
              id: item.id,
              user: item.user,
              loggedInUserReadChatAt: item.contactReadChatAt,
            };
          }
        })
      );

    // New messages that logged in user has not read
    // By contacts that logged in user has "added"
    const contactsWithNewMessages = await prisma.contact
      .findMany({
        where: {
          OR: contacts.map((item) => ({
            id: item.id,
            messages: {
              some: {
                userId: {
                  not: payload!.userId,
                },
                createdAt: {
                  gte: new Date(item.loggedInUserReadChatAt),
                },
              },
            },
          })),
        },
        select: {
          id: true,
        },
      })
      .then((contacts) => contacts.map((item) => item.id));

    const result = contacts.map((item) => {
      const found = contactsWithNewMessages.some((el) => item.id === el);
      return {
        ...item,
        newMessages: found,
      };
    });

    return result;
  }

  @Query(() => ChatMessagesResponse, {
    nullable: true,
    description: "Return messages for a project by id",
  })
  @UseMiddleware(isAuth)
  async projectMessages(
    @Arg("data") { id, after, before, first, last }: ChatInput,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that project exists and logged in user is a member
    const project = await prisma.project.findFirst({
      where: {
        id,
        members: {
          some: {
            userId: payload!.userId,
            status: "ACCEPTED",
          },
        },
        disabled: false,
      },
    });

    if (!project) {
      throw new ForbiddenError("Not Authorized");
    }

    // Sets the last time logged in member read the project chat
    await prisma.member.update({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId: id,
        },
      },
      data: {
        readChatAt: new Date().toISOString(),
      },
    });

    const messages = await prisma.message.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        projectId: id,
      },
      select: {
        id: true,
        projectId: true,
        body: true,
        user: {
          include: {
            profile: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const hasMore = messages.length >= (last ?? 20);

    return {
      messages,
      hasMore,
    };
  }

  @Query(() => ChatMessagesResponse, {
    nullable: true,
    description: "Return messages for contact by id",
  })
  @UseMiddleware(isAuth)
  async contactMessages(
    @Arg("data") { id, after, before, first, last }: ChatInput,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that contact exists and logged in user is part of it
    const contact = await prisma.contact.findFirst({
      where: {
        id,
        OR: [
          {
            userId: payload!.userId,
          },
          {
            contactId: payload!.userId,
          },
        ],
        status: "TRUE",
      },
    });

    if (!contact) {
      throw new ForbiddenError("Not Authorized");
    }

    // Sets the last time that logged in user visited chat
    if (contact.userId === payload!.userId) {
      await prisma.contact.update({
        where: {
          id: contact.id,
        },
        data: {
          userReadChatAt: new Date().toISOString(),
        },
      });
    } else {
      await prisma.contact.update({
        where: {
          id: contact.id,
        },
        data: {
          contactReadChatAt: new Date().toISOString(),
        },
      });
    }

    const messages = await prisma.message.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        contactId: id,
      },
      select: {
        id: true,
        projectId: true,
        body: true,
        user: {
          include: {
            profile: true,
          },
        },
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const hasMore = messages.length >= (last ?? 20);

    return {
      messages,
      hasMore,
    };
  }

  @Mutation(() => Message, {
    description: "Add Message to project, by project id",
  })
  @UseMiddleware(isAuth)
  async projectAddMessage(
    @Arg("data") { id, body }: CreateMessageInput,
    @Ctx() { payload, prisma }: Context,
    @PubSub("NEW_MESSAGE")
    publish: Publisher<MessageSubscribtionResponse>
  ): Promise<Message> {
    // Validate body input
    await MessageValidationSchema.validate({
      body,
    });

    // Checks that project exists and logged in user is part of it
    const project = await prisma.project.findFirst({
      where: {
        id,
        members: {
          some: {
            userId: payload!.userId,
            status: "ACCEPTED",
          },
        },
        disabled: false,
      },
      select: {
        members: {
          where: {
            status: "ACCEPTED",
          },
          select: {
            userId: true,
          },
        },
      },
    });

    if (!project) {
      throw new ForbiddenError("Not Authorized");
    }

    // Creates a new message
    const newMessage = await prisma.message.create({
      data: {
        projectId: id,
        userId: payload!.userId,
        body,
      },
      select: {
        id: true,
        projectId: true,
        body: true,
        user: {
          include: {
            profile: true,
          },
        },
        createdAt: true,
      },
    });

    if (newMessage.projectId) {
      // Update project latestMessageDate value to the same as the newMessage creation date
      await prisma.project.update({
        where: {
          id,
        },
        data: {
          latestMessageDate: newMessage.createdAt,
        },
      });

      const authReceivers = project.members.map((item) => item.userId);
      // Logged in user and contact receives a new message through subscription
      await publish({
        id: newMessage.id,
        chatId: newMessage.projectId,
        body: newMessage.body,
        user: newMessage.user,
        authReceivers: authReceivers,
        createdAt: newMessage.createdAt,
      });
    }

    return newMessage;
  }

  @Mutation(() => Message, {
    description: "Add new message by contact id",
  })
  @UseMiddleware(isAuth)
  async contactAddMessage(
    @Arg("data") { id, body }: CreateMessageInput,
    @Ctx() { payload, prisma }: Context,
    @PubSub("NEW_MESSAGE")
    publish: Publisher<MessageSubscribtionResponse>
  ): Promise<Message> {
    // Validate body input
    await MessageValidationSchema.validate({
      body,
    });

    // Check that logged in user is part of contact
    const contact = await prisma.contact.findFirst({
      where: {
        id: id,
        OR: [
          {
            userId: payload!.userId,
          },
          {
            contactId: payload!.userId,
          },
        ],
        status: "TRUE",
      },
    });

    if (!contact) {
      throw new UserInputError("Not Authorized");
    }

    // Creates new message
    const newMessage = await prisma.message.create({
      data: {
        body,
        contactId: id,
        userId: payload!.userId,
      },
      select: {
        id: true,
        contactId: true,
        body: true,
        user: {
          include: {
            profile: true,
          },
        },
        createdAt: true,
      },
    });

    if (newMessage.contactId) {
      // Update contact latestMessageDate value to the same as the newMessage creation date
      await prisma.contact.update({
        where: {
          userId_contactId: {
            userId: contact.userId,
            contactId: contact.contactId,
          },
        },
        data: {
          latestMessageDate: newMessage.createdAt,
        },
      });

      // Logged in user and contact receives a new message through subscription
      await publish({
        id: newMessage.id,
        chatId: newMessage.contactId,
        body: newMessage.body,
        user: newMessage.user,
        authReceivers: [contact.contactId, contact.userId],
        createdAt: newMessage.createdAt,
      });
    }

    return newMessage;
  }

  @Subscription({
    topics: "NEW_MESSAGE",
    filter: ({ payload, args }) => {
      return payload.chatId === args.chatId;
    },
  })
  newMessage(
    @Root() message: MessageSubscribtionResponse,
    @Arg("chatId") chatId: string,
    @Ctx() { userId }: JwtPayload
  ): MessageSubscribtionResponse {
    // Checks that logged in user is authorized to read message
    const isAuthorized = message.authReceivers.includes(userId);

    if (!isAuthorized) {
      throw new ForbiddenError("Not Authorized");
    }

    return message;
  }
}
