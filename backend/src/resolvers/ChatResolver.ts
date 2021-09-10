import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { ChatRoom } from "../types/ChatRoom";
import { Project } from "../types/Project";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import { ChatRoomResponse, ContactResponse } from "./responses/ChatResponse";
import { SearchArgs } from "./inputs/GlobalInputs";
import { pagination } from "../utils/pagination";

//        chat/:id/

// TODO: Queries/mutations/subscriptions to be implemented:
// projectsChatRoom:        Return all chatrooms for projects
// contactsChatRoom:        Return all chatrooms for contacts, implement search
// messagesByProjectId:     Return all messages by projectId, implement infinite scroll to only get 10 messages before scroll.
// messagesByContactId:     Return all messages by projectId, implement infinite scroll to only get 10 messages before scroll.
// newMessagesByProjectId:  Return a list of all the ChatRooms which have new messages
// sendMessageToGroup:      Sends a new message to a group(messages) by projectId
// sendMessageToContact:    Sends a new message to another contact
// subscribe:               Check for a new message

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
  async contactsChatRoom(
    @Arg("data") { searchText, after, before, first, last }: SearchArgs,
    @Ctx() { payload, prisma }: Context
  ) {
    const filters = {};

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
      // // Reformatted contacts list so that userId, userReadChatAt has always the logged in user values
      // // And the contactId has always the logged in users contact values
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

    console.log(contacts);

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
                // Checks if there are any new message with never datetime values than when the logged in user visited the chatroom.
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

    // Returns all users who have new messages
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

    // Returns all users who have don't have new messages
    const usersWithOldMessages = await prisma.user.findMany({
      where: {
        ...pagination({ after, before, first, last }),
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
      usersWithOldMessages,
    };
  }

  @Query(() => ChatRoom, {
    nullable: true,
    description: "Return messages for a ChatRoom by projectId",
  })
  @UseMiddleware(isAuth)
  async messagesByProjectId(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Query:
    // project: title,
    // users: id, profileImage,
    // messages: body, profile > firstname, lastname & profileImage

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  }
}
