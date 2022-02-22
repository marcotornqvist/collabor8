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
import { Project } from "../types/Project";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import { ChatRoomResponse, ContactResponse } from "./responses/ChatResponse";
import { SearchArgs } from "./inputs/GlobalInputs";
import { pagination } from "../utils/pagination";
import { ForbiddenError, UserInputError } from "apollo-server-express";
import { Message } from "../types/Message";
import { ChatInput, CreateMessageInput } from "./inputs/ChatInput";
import { User } from "../types/User";
import { MessageValidationSchema } from "../validations/schemas";
import { MessageSubscribtionResponse } from "./responses/MessageResponse";
import { JwtPayload } from "jsonwebtoken";

// TODO: Queries/mutations/subscriptions to be implemented:
// projectsChatRoom:        Return all chatrooms for projects - Done
// contactsChatRoom:        Return all chatrooms for contacts - Done
// projectChatRoomDetails:  Return details for a project chatroom - Done
// contactChatRoomDetails:  Return details for a contact chatroom - Done
// projectMessages:         Return all messages by projectId - Done
// contactMessages:         Return all messages by contactId - Done
// projectAddMessage:       Creates a new message to project by projectId - Done
// contactAddMessage:       Creates a new message to contact by contactId - Done
// newMessage:              Checks for a new message in the active chat window (subscription)

@Resolver(ChatRoom)
export class ChatResolver {
  @Query(() => ChatRoomResponse, {
    nullable: true,
    description: "Returns all projects chatRooms",
  })
  @UseMiddleware(isAuth)
  async projectsChatRoom(@Ctx() { payload, prisma }: Context) {
    // Returns a list of all the projects logged in user is a member of
    const memberOf = await prisma.member.findMany({
      where: {
        userId: payload!.userId,
      },
      select: {
        // readChatAt is the Datetime value when a member last time opened the chat
        readChatAt: true,
        projectId: true,
      },
    });

    // Loop through all projects and return projects (chatRooms) where there are unread Messages
    const unreadChatRooms = await prisma.chatRoom.findMany({
      where: {
        // Loops through memberOf list and returns projects incase
        // there are messages that are created after logged in user has readChatAt
        OR: memberOf.map((item) => ({
          projectId: item.projectId,
          messages: {
            some: {
              // Checks that messages are not written by logged in user
              userId: {
                not: payload!.userId,
              },
              // Checks if there are any new message with never datetime values than when the logged in user visited the chatroom.
              createdAt: {
                gte: new Date(item.readChatAt),
              },
            },
          },
        })),
        // Doesn't return projects that are disabled
        project: {
          disabled: false,
        },
      },
      select: {
        id: true,
        projectId: true,
        project: {
          select: {
            title: true,
          },
        },
      },
    });

    // Remaining projects of a user that have no new messages
    // Filters out all the project chatrooms that appeared in the unreadChatRooms
    const remainingProjects = memberOf
      .filter(
        (item) =>
          !unreadChatRooms.some((read) => item.projectId !== read.projectId)
      )
      .map((item) => ({ projectId: item.projectId }));

    // Returns chatRooms where messages are already read
    const readChatRooms = await prisma.chatRoom.findMany({
      where: {
        OR: remainingProjects,
        project: {
          disabled: false,
        },
      },
      select: {
        id: true,
        projectId: true,
        project: {
          select: {
            title: true,
          },
        },
      },
    });

    return {
      unreadChatRooms,
      readChatRooms,
    };
  }

  @Query(() => ContactResponse, {
    nullable: true,
    description: "Returns all contact chatRooms",
  })
  @UseMiddleware(isAuth)
  async contactsChatroom(
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
        select: {
          id: true,
          contactId: true,
          userId: true,
          contactReadChatAt: true,
          userReadChatAt: true,
          contact: {
            select: {
              id: true,
              profile: true,
            },
          },
          user: {
            select: {
              id: true,
              profile: true,
            },
          },
          chatRoom: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          
        },
      })
      .then((contacts) =>
        contacts.map((item) => {
          if (item.userId === payload!.userId) {
            return {
              id: item.id,
              user: item.contact,
              loggedInUserReadChatAt: item.userReadChatAt,
              // contactId: item.contactId,
              // userId: item.userId,
            };
          } else {
            return {
              id: item.id,
              user: item.user,
              loggedInUserReadChatAt: item.contactReadChatAt,
              // contactId: item.userId,
              // userId: item.contactId,
            };
          }
        })
      );

    console.log("----NEW QUERY----");
    console.log(contacts);

    // Fetch all contacts where userId matches the payload!.user, (apply pagination)
    // Return only contacts which have a status of "TRUE" in a variable called contacts
    // Create a new list called contactsNewMessages that fetches contacts with new messages only
    // Return only contact row id and readChatAt, add a boolean field called newMessages: true
    // Create a new list that takes that contactsList and filters out values that are included in the contactsNewMessages
    // Merge contactsNewMessages and contacts

    // New messages that logged in user has not read
    // By contacts that logged in user has "added"
    const contactsWithNewMessages = await prisma.contact
      .findMany({
        where: {
          chatRoom: {
            OR: contacts.map((item) => ({
              contactId: item.id,
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
        },
        select: {
          id: true,
        },
      })
      .then((data) => data.map((item) => item.id));

    console.log(contactsWithNewMessages);

    const result = contacts.map((item) => {
      const found = contactsWithNewMessages.some((el) => el === item.id);
      return {
        ...item,
        newMessage: found,
      };
    });

    console.log(result);

    return {
      // usersWithNewMessages,
      // usersWithNoNewMessages,
    };
  }

  // @Query(() => ContactResponse, {
  //   nullable: true,
  //   description: "Returns all contact chatRooms",
  // })
  // @UseMiddleware(isAuth)
  // async contactsChatroom(
  //   @Arg("data") { searchText, after, before, first, last }: SearchArgs,
  //   @Ctx() { payload, prisma }: Context
  // ) {
  //   const filters = {};

  //   // Checks if there's any searchText if so apply that, else search all contacts for a certain user
  //   if (searchText) {
  //     Object.assign(filters, {
  //       OR: [
  //         {
  //           user: {
  //             profile: {
  //               fullName: {
  //                 contains: searchText,
  //                 mode: "insensitive",
  //               },
  //             },
  //           },
  //           contactId: payload!.userId,
  //         },
  //         {
  //           contact: {
  //             profile: {
  //               fullName: {
  //                 contains: searchText,
  //                 mode: "insensitive",
  //               },
  //             },
  //           },
  //           userId: payload!.userId,
  //         },
  //       ],
  //     });
  //   } else {
  //     Object.assign(filters, {
  //       OR: [
  //         {
  //           contactId: payload!.userId,
  //         },
  //         {
  //           userId: payload!.userId,
  //         },
  //       ],
  //     });
  //   }

  //   // Returns a list of all the contacts for the logged in user
  //   const contacts = await prisma.user.findFirst({
  //     where: {
  //       id: payload!.userId,
  //     },
  //     include: {
  //       contactsRcvd: {
  //         where: {
  //           ...filters,
  //           status: "TRUE",
  //         },
  //         select: {
  //           id: true,
  //           contactReadChatAt: true,
  //         },
  //       },
  //       contactsSent: {
  //         where: {
  //           ...filters,
  //           status: "TRUE",
  //         },
  //         select: {
  //           id: true,
  //           userReadChatAt: true,
  //         },
  //       },
  //     },
  //   });

  //   // Fetch all contacts where userId matches the payload!.user, (apply pagination)
  //   // Return only contacts which have a status of "TRUE" in a variable called contacts
  //   // Create a new list called contactsNewMessages that fetches contacts with new messages only
  //   // by comparing the readChatAt to the latest message date
  //   // Return only contact row id and readChatAt
  //   // Create a new list that takes that contactsList and filters out values that are included in the contactsNewMessages
  //   //

  //   // New messages that logged in user has not read
  //   // By contacts that have "added" logged in user
  //   const contactsRcvdWithNewMessages = await prisma.contact
  //     .findMany({
  //       where: {
  //         contactId: payload!.userId,
  //         chatRoom: {
  //           OR: contacts?.contactsRcvd.map((item) => ({
  //             contactId: item.id,
  //             messages: {
  //               some: {
  //                 userId: {
  //                   not: payload!.userId,
  //                 },
  //                 createdAt: {
  //                   gte: new Date(item.contactReadChatAt),
  //                 },
  //               },
  //             },
  //           })),
  //         },
  //       },
  //       select: {
  //         id: true,
  //         chatRoom: {
  //           select: {
  //             id: true,
  //           },
  //         },
  //         contactReadChatAt: true,
  //         user: {
  //           include: {
  //             profile: true,
  //           },
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       return data.map((item) => ({
  //         id: item.id,
  //         chatroomId: item.chatRoom?.id,
  //         userReadChatAt: item.contactReadChatAt,
  //         user: item.user,
  //       }));
  //     });

  //   // New messages that logged in user has not read
  //   // By contacts that logged in user has "added"
  //   const contactsSentWithNewMessages = await prisma.contact
  //     .findMany({
  //       where: {
  //         userId: payload!.userId,
  //         chatRoom: {
  //           OR: contacts?.contactsSent.map((item) => ({
  //             contactId: item.id,
  //             messages: {
  //               some: {
  //                 userId: {
  //                   not: payload!.userId,
  //                 },
  //                 createdAt: {
  //                   gte: new Date(item.userReadChatAt),
  //                 },
  //               },
  //             },
  //           })),
  //         },
  //       },
  //       select: {
  //         id: true,
  //         chatRoom: {
  //           select: {
  //             id: true,
  //           },
  //         },
  //         userReadChatAt: true,
  //         contact: {
  //           include: {
  //             profile: true,
  //           },
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       return data.map((item) => ({
  //         id: item.id,
  //         chatroomId: item.chatRoom?.id,
  //         userReadChatAt: item.userReadChatAt,
  //         user: item.contact,
  //       }));
  //     });

  //   const merged = contactsRcvdWithNewMessages
  //     .concat(contactsSentWithNewMessages)
  //     .sort((a: any, b: any) => b.userReadChatAt - a.userReadChatAt);

  //   console.log(contactsRcvdWithNewMessages);
  //   console.log(contactsSentWithNewMessages);
  //   console.log(merged);

  //   // Returns all users who don't have new messages
  //   // const contactsWithNoNewMessages = await prisma.contact.findMany({
  //   //   where: {
  //   //     ...pagination({ after, before, first, last }),
  //   //     OR: [
  //   //       {
  //   //         contactId: payload!.userId,
  //   //       },
  //   //       {
  //   //         userId: payload!.userId,
  //   //       },
  //   //     ],
  //   //     id: {
  //   //       notIn: merged.map((item) => item.id),
  //   //     },
  //   //   },
  //   //   select: {
  //   //     id: true,
  //   //     chatRoom: {
  //   //       select: {
  //   //         id: true,
  //   //       },
  //   //     },
  //   //     userId: true,
  //   //     contactId: true,
  //   //     user: {
  //   //       include: {
  //   //         profile: true,
  //   //       },
  //   //     },
  //   //     contact: {
  //   //       include: {
  //   //         profile: true,
  //   //       },
  //   //     },
  //   //     userReadChatAt: true,
  //   //     contactReadChatAt: true,
  //   //   },
  //   // });

  //   // console.log(contactsWithNoNewMessages);

  //   return {
  //     // usersWithNewMessages,
  //     // usersWithNoNewMessages,
  //   };
  // }

  @Query(() => ContactResponse, {
    nullable: true,
    description: "Returns all contact chatRooms",
  })
  @UseMiddleware(isAuth)
  async contactsChatRoom(
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

    // Returns a list of all the contacts for the logged in user
    const contacts = await prisma.contact
      .findMany({
        where: {
          ...filters,
          status: "TRUE",
        },
      })
      // Reformatted contacts list so that userId, userReadChatAt has always the logged in user values
      // And the contactId has always the logged in users contact values
      .then((contacts) =>
        contacts.map((item) => {
          if (item.userId === payload!.userId) {
            return {
              id: item.id,
              userId: item.userId,
              userReadChatAt: item.userReadChatAt,
              contactId: item.contactId,
            };
          } else {
            return {
              id: item.id,
              userId: item.contactId,
              userReadChatAt: item.contactReadChatAt,
              contactId: item.userId,
            };
          }
        })
      );

    // Returns all contact relationships where there are unread new messages
    const contactsWithNewMessages = await prisma.contact.findMany({
      where: {
        chatRoom: {
          OR: contacts.map((item) => ({
            contactId: item.id,
            messages: {
              some: {
                userId: {
                  not: item.userId,
                },
                // Checks if there are any new message with never datetime values
                // than when the logged in user visited the chatroom.
                createdAt: {
                  gte: new Date(item.userReadChatAt),
                },
              },
            },
          })),
        },
      },
      select: {
        id: true,
        contactId: true,
        userId: true,
      },
    });

    // Returns all users who have sent new messages
    const usersWithNewMessages = await prisma.user.findMany({
      where: {
        OR: contactsWithNewMessages.map((user) => ({
          id: payload!.userId === user.userId ? user.contactId : user.userId,
        })),
      },
      select: {
        id: true,
        profile: {
          select: {
            fullName: true,
            profileImage: true,
            discipline: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    // Returns all the remaining contacts that don't have any new messages
    const remainingContacts = contacts
      .filter(
        (item) => !contactsWithNewMessages.some((read) => item.id === read.id)
      )
      .map((item) => ({ id: item.contactId }));

    // Returns all users who don't have new messages
    const usersWithNoNewMessages = await prisma.user.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        OR: remainingContacts,
      },
      select: {
        id: true,
        profile: {
          select: {
            fullName: true,
            profileImage: true,
            discipline: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    return {
      usersWithNewMessages,
      usersWithNoNewMessages,
    };
  }

  @Query(() => Project, {
    nullable: true,
    description: "Return details for a project",
  })
  @UseMiddleware(isAuth)
  async projectChatRoomDetails(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    const project = await prisma.project.findFirst({
      where: {
        chatRoom: {
          id,
        },
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

    return project;
  }

  @Query(() => User, {
    nullable: true,
    description: "Return details for a contact",
  })
  @UseMiddleware(isAuth)
  async contactChatRoomDetails(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          {
            userId: payload!.userId,
            contactId: id,
          },
          {
            userId: id,
            contactId: payload!.userId,
          },
        ],
        status: "TRUE",
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
        contact: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    if (!contact) {
      throw new ForbiddenError("Not Authorized");
    }

    // Returns the contact and not the logged in user
    const otherUser = contact.user.id.includes(payload!.userId)
      ? contact.contact
      : contact.user;

    return otherUser;
  }

  @Query(() => [Message], {
    nullable: true,
    description: "Return messages for a ChatRoom by projectId",
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
        chat: {
          projectId: id,
        },
      },
      select: {
        id: true,
        body: true,
        user: {
          select: {
            username: true,
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  }

  @Query(() => [Message], {
    nullable: true,
    description: "Return messages for a ChatRoom by contactId",
  })
  @UseMiddleware(isAuth)
  async contactMessages(
    @Arg("data") { id, after, before, first, last }: ChatInput,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that contact exists and logged in user is part of it
    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          {
            userId: payload!.userId,
            contactId: id,
          },
          {
            userId: id,
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
        chat: {
          contactId: contact.id,
        },
      },
      select: {
        id: true,
        body: true,
        user: {
          select: {
            username: true,
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  }

  @Mutation(() => Message, {
    description: "Add Message to project, by project id",
  })
  @UseMiddleware(isAuth)
  async projectAddMessage(
    @Arg("data") { id, body }: CreateMessageInput,
    @Ctx() { payload, prisma }: Context,
    @PubSub("NEW_CHATROOM_MESSAGE")
    publish: Publisher<MessageSubscribtionResponse>
  ): Promise<Message> {
    // Validate body input
    await MessageValidationSchema.validate({
      body,
    });

    // Checks that project exists and logged in user is part of it
    const project = await prisma.project.findFirst({
      where: {
        chatRoom: {
          id,
        },
        members: {
          some: {
            userId: payload!.userId,
            status: "ACCEPTED",
          },
        },
        disabled: false,
      },
      select: {
        chatRoom: {
          select: {
            id: true,
          },
        },
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
        chatId: project.chatRoom!.id,
        userId: payload!.userId,
        body,
      },
      include: {
        user: {
          include: {
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    const authReceivers = project.members.map((item) => item.userId);

    // Sends a new message to all users who are in the chatRoom
    await publish({
      id: newMessage.id,
      body: newMessage.body,
      chatId: newMessage.chatId,
      fullname: newMessage.user?.profile?.fullName,
      profileImage: newMessage.user?.profile?.profileImage,
      authReceivers: authReceivers,
      createdAt: newMessage.createdAt,
    });

    return newMessage;
  }

  @Mutation(() => Message, {
    description: "Add Message to contact by contact id",
  })
  @UseMiddleware(isAuth)
  async contactAddMessage(
    @Arg("data") { id, body }: CreateMessageInput,
    @Ctx() { payload, prisma }: Context,
    @PubSub("NEW_CHATROOM_MESSAGE")
    publish: Publisher<MessageSubscribtionResponse>
  ): Promise<Message> {
    // Validate body input
    await MessageValidationSchema.validate({
      body,
    });

    // Checks that logged in user is part of the chatroom by chatroom id and by
    // Checking that logged in user is part of the contact with a status of "TRUE"
    const chatroom = await prisma.chatRoom.findFirst({
      where: {
        contact: {
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
      },
    });

    if (!chatroom) {
      throw new UserInputError("Not Authorized");
    }

    // Create a new message based on the chatRoom id and logged in user id
    const newMessage = await prisma.message.create({
      data: {
        chatId: id,
        userId: payload!.userId,
        body,
      },
      include: {
        user: {
          include: {
            profile: {
              select: {
                fullName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    // Sends a new message to all users who are in the chatRoom
    await publish({
      id: newMessage.id,
      body: newMessage.body,
      chatId: newMessage.chatId,
      fullname: newMessage.user?.profile?.fullName,
      profileImage: newMessage.user?.profile?.profileImage,
      authReceivers: [payload!.userId, id],
      createdAt: newMessage.createdAt,
    });

    return newMessage;
  }

  @Subscription({
    topics: "NEW_CHATROOM_MESSAGE",
    filter: ({ payload, args }) => {
      console.log(payload);
      // Subscribes to a certain chatRoom by chatId
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
