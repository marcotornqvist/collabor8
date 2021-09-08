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
import { isBlocked } from "../utils/isBlocked";
import { Contact } from "../types/Contact";

// TODO: Queries/mutations to be implemented:
// contacts         Return all contacts for logged in user - In Progress
// addUser          Add a new user to your contacts - In Progress
// removeContact    Remove contact from your list - In Progress

@Resolver(Contact)
export class ContactResolver {
  @Query(() => [Contact], {
    description: "Returns all contacts for loggedInUser",
  })
  @UseMiddleware(isAuth)
  async contacts(@Ctx() { payload, prisma }: Context) {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: payload!.userId,
      },
    });

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
    const blocked = await isBlocked(payload!.userId, id);

    if (blocked) throw new Error("You cannot add user since user is blocked");

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

    console.log(contactExist)

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
