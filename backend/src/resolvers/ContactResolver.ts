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

// TODO: Queries/mutations to be implemented:
// contacts             Return all contacts for logged in user - Done
// sendContactRequest   Add a new user to your contacts - Done
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

  @Mutation(() => Boolean, {
    description: "Add a user to contact list",
  })
  @UseMiddleware(isAuth)
  async sendContactRequest(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Checks that user isn't adding himself
    if (id === payload!.userId) {
      throw new Error("You cannot add yourself");
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

    if (isBlocked)
      throw new Error("You cannot add user since you've blocked the user");

    // Create a new contact between logged in user and another user id
    await prisma.contact.create({
      data: {
        userId: payload!.userId,
        contactId: id,
      },
    });

    return true;
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
        status: "TRUE",
      },
    });

    console.log(contact);

    if (!contact) {
      throw new Error("Contact doesn't exist");
    }

    // Delete contact from contacts list
    await prisma.contact.delete({
      where: {
        id: contact.id,
      },
    });

    return true;
  }

  @Mutation(() => Boolean, {
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

    if (!contact || (contact.status === "TRUE")) {
      throw new Error("Contact request doesn't exist");
    }

    // Accept contact request
    await prisma.contact.update({
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

    return true;
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
    await prisma.contact.update({
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

    return true;
  }
}
