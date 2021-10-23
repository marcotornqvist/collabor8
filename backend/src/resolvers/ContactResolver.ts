import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import { BlockedUser } from "../types/BlockedUser";
import { UserInputError } from "apollo-server-express";
import { Contact } from "../types/Contact";
import { User } from "../types/User";
import { CONTACT_STATUS } from "../types/Enums";
import { NotificationCode } from "@prisma/client";

// TODO: Queries/mutations to be implemented:
// contacts             Return all contacts for logged in user - Done
// contactStatus        Check what the status is or if a contact request even exist
// addContact           Add a new user to your contacts - Done
// deleteContact        Delete contact request - Done
// acceptContact        Accept a pending contact request - Done
// rejectContact        Reject contact request (for users that have received a contact where status is pending) - Done

@Resolver(Contact)
export class ContactResolver {
  @Query(() => [User], {
    description: "Returns all contacts for loggedInUser",
  })
  @UseMiddleware(isAuth)
  async contacts(@Ctx() { payload, prisma }: Context) {
    const contacts = await prisma.contact
      .findMany({
        where: {
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
        orderBy: { createdAt: "desc" },
      })
      .then((contacts) =>
        contacts.map((item) => {
          if (item.user.id === payload!.userId) {
            return {
              id: item.contact.id,
              username: item.contact.username,
              profile: {
                fullName: item.contact.profile?.fullName,
                profileImage: item.contact.profile?.profileImage,
              },
            };
          } else {
            return {
              id: item.user.id,
              username: item.user.username,
              profile: {
                fullName: item.user.profile?.fullName,
                profileImage: item.user.profile?.profileImage,
              },
            };
          }
        })
      );

    return contacts;
  }

  @Query(() => CONTACT_STATUS, {
    description:
      "Return the status for a contact request between loggedInUser and userId",
  })
  @UseMiddleware(isAuth)
  async contactStatus(
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
            contactId: payload!.userId,
            userId: id,
          },
        ],
      },
    });

    // No contact exist
    if (!contact) {
      return CONTACT_STATUS.NO_CONTACT;
    }

    // Contact is sent but not accepted (PENDING)
    if (contact.status !== "TRUE" && contact.userId === payload!.userId) {
      return CONTACT_STATUS.REQUEST_SENT;
    }

    // Contact is received but not accepted (PENDING)
    if (contact.status !== "TRUE" && contact.contactId === payload!.userId) {
      return CONTACT_STATUS.REQUEST_RECEIVED;
    }

    // Contact is active and accepted (TRUE)
    if (contact.status === "TRUE") {
      return CONTACT_STATUS.ACTIVE_CONTACT;
    }

    return CONTACT_STATUS.NO_CONTACT;
  }

  @Mutation(() => Contact, {
    description: "Add a user to contact list",
  })
  @UseMiddleware(isAuth)
  async addContact(@Arg("id") id: string, @Ctx() { payload, prisma }: Context) {
    // Checks that user isn't adding himself
    if (id === payload!.userId) {
      throw new Error("You cannot add yourself.");
    }

    // Checks that contact doesn't already exist
    const contactExists = await prisma.contact.findFirst({
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
      },
    });

    if (contactExists) {
      throw new Error("User is already in your contacts list");
    }

    // Checks if user is blocked
    const isBlocked = await prisma.blockedUser.findUnique({
      where: {
        userId_blockedUserId: {
          userId: payload!.userId,
          blockedUserId: id,
        },
      },
    });

    if (isBlocked) throw new Error("You cannot add a user you've blocked.");

    // Create a new contact between logged in user and another user id
    const contact = await prisma.contact.create({
      data: {
        userId: payload!.userId,
        contactId: id,
      },
    });

    // Send a notification that logged in user has sent a contact request
    if (contact) {
      await prisma.notification.create({
        data: {
          senderId: payload!.userId,
          receiverId: id,
          notificationCode: NotificationCode.CONTACT_REQUEST,
        },
      });
    }

    return contact;
  }

  @Mutation(() => Boolean, {
    description: "Delete contact from contacts list",
  })
  @UseMiddleware(isAuth)
  async deleteContact(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that contact exists
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
      },
    });

    if (!contact) {
      throw new Error("Contact doesn't exist");
    }

    // Delete contact from contacts list
    const deleted = await prisma.contact.delete({
      where: {
        id: contact.id,
      },
    });

    if (deleted) {
      // Find "CONTACT_REQUEST" notification before deleting it
      const notification = await prisma.notification.findFirst({
        where: {
          OR: [
            {
              senderId: payload!.userId,
              receiverId: id,
              notificationCode: NotificationCode.CONTACT_REQUEST,
            },
            {
              senderId: id,
              receiverId: payload!.userId,
              notificationCode: NotificationCode.CONTACT_REQUEST,
            },
          ],
        },
      });

      // Delete the old notification
      if (notification) {
        await prisma.notification.delete({
          where: {
            id: notification.id,
          },
        });
      }
    }

    return true;
  }

  @Mutation(() => Contact, {
    description: "Accept contact request",
  })
  @UseMiddleware(isAuth)
  async acceptContact(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that contact request exists
    const contact = await prisma.contact.findUnique({
      where: {
        userId_contactId: {
          userId: id,
          contactId: payload!.userId,
        },
      },
    });

    if (!contact || contact.status === "TRUE") {
      throw new Error("Contact request doesn't exist");
    }

    // Accept contact request
    const newContact = await prisma.contact.update({
      where: {
        userId_contactId: {
          userId: id,
          contactId: payload!.userId,
        },
      },
      data: {
        status: "TRUE",
      },
    });

    if (newContact) {
      // Find "CONTACT_REQUEST" notification before deleting it
      const notification = await prisma.notification.findFirst({
        where: {
          senderId: payload!.userId,
          receiverId: id,
          notificationCode: NotificationCode.CONTACT_REQUEST,
        },
        select: {
          id: true,
        },
      });

      // Delete the old notification
      if (notification) {
        await prisma.notification.delete({
          where: {
            id: notification.id,
          },
        });
      }

      // Send a notification that user has accepted contact request
      await prisma.notification.create({
        data: {
          senderId: payload!.userId,
          receiverId: id,
          notificationCode: NotificationCode.CONTACT_ACCEPTED,
        },
      });
    }

    return newContact;
  }

  @Mutation(() => Boolean, {
    description: "Reject contact request",
  })
  @UseMiddleware(isAuth)
  async rejectContact(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that contact request exists
    const contact = await prisma.contact.findUnique({
      where: {
        userId_contactId: {
          userId: id,
          contactId: payload!.userId,
        },
      },
    });

    // Checks that contact request exists and is pending
    if (!contact || contact.status !== "PENDING") {
      throw new Error("Contact request doesn't exist");
    }

    // Reject contact request
    const rejected = await prisma.contact.update({
      where: {
        userId_contactId: {
          userId: id,
          contactId: payload!.userId,
        },
      },
      data: {
        status: "FALSE",
      },
    });

    if (rejected) {
      // Find "CONTACT_REQUEST" notification before deleting it
      const notification = await prisma.notification.findFirst({
        where: {
          senderId: id,
          receiverId: payload!.userId,
          notificationCode: NotificationCode.CONTACT_REQUEST,
        },
        select: {
          id: true,
        },
      });

      // Delete the old notification
      if (notification) {
        await prisma.notification.delete({
          where: {
            id: notification.id,
          },
        });
      }
    }

    return true;
  }
}
