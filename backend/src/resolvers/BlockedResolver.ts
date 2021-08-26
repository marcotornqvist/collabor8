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

// TODO: Queries/mutations to be implemented:
// blockedUsers // query
// blockUserById; // mutation
// unblockUserById; // mutation

@Resolver(BlockedUser)
export class BlockedUserResolver {
  @Query(() => [BlockedUser], {
    description: "Returns all blocked users",
  })
  @UseMiddleware(isAuth)
  async blockedUsers(@Ctx() { payload, prisma }: Context) {
    const users = await prisma.blockedUser.findMany({
      where: {
        userId: payload!.userId,
      },
      include: {
        blockedUser: true,
      },
    });

    return users;
  }

  @Mutation(() => Boolean, {
    description: "Block a user by id",
  })
  @UseMiddleware(isAuth)
  async blockUserById(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    const blocked = await isBlocked(payload!.userId, id);

    if (blocked) throw new Error("User is already blocked");

    const userExist = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExist) {
      throw new UserInputError("User doesn't exist");
    }

    await prisma.blockedUser.create({
      data: {
        userId: payload!.userId,
        blockedUserId: id,
      },
    });

    return true;
  }

  @Mutation(() => Boolean, {
    description: "Unblock a blocked user by id",
  })
  @UseMiddleware(isAuth)
  async unblockUserById(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    const blocked = await isBlocked(payload!.userId, id);

    if (!blocked) throw new Error("User is not blocked or doesn't exist");

    await prisma.blockedUser.delete({
      where: {
        userId_blockedUserId: {
          userId: payload!.userId,
          blockedUserId: id,
        },
      },
    });

    return true;
  }
}
