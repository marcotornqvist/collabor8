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
// contacts         Return all contacts for logged in user - Done
// addUser          Add a new user to your contacts - In Progress
// removeContact    Remove contact by updating status to false - In Progress
// acceptContact    Accept a pending contact request - In Progress

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
    description: "Add a user to contacts",
  })
  @UseMiddleware(isAuth)
  async addUser(@Arg("id") id: string, @Ctx() { payload, prisma }: Context) {
    // Check if user is blocked
    // Check if user is already part of your contact list
    // Check if user exists

    // Checks if user is blocked
    const isBlocked = await prisma.blockedUser.findUnique({
      where: {
        userId_blockedUserId: {
          userId: payload!.userId,
          blockedUserId: id,
        },
      },
    });

    if (isBlocked) throw new Error("You cannot add user since user is blocked");

    // Checks if contact exists
    const contactExist = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        contactsSent: {
          select: {
            contactId: true,
          },
        },
        contactsRcvd: {
          select: {
            userId: true,
          },
        },
      },
    });

    console.log(contactExist);

    // if (!contactExist) {
    //   throw new Error("User is already in your contacts list");
    // }

    // // Checks if user exists
    // const userExist = await prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!userExist) {
    //   throw new UserInputError("User doesn't exist");
    // }

    // await prisma.blockedUser.create({
    //   data: {
    //     userId: payload!.userId,
    //     blockedUserId: id,
    //   },
    // });

    return true;
  }
}
