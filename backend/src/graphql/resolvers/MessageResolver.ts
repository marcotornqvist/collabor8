import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  // FieldResolver,
  // Root,
  // Int,
  // InputType,
  // Field,
} from "type-graphql";
import { User } from "../entities/User";
// import { Post } from "./Post";
import { Context } from "../utils/context";
// import { PostCreateInput } from "./PostResolver";
import { UserCreateInput } from "./types/UserCreateInput";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @Mutation(() => User)
  async addUser(
    @Arg("data") { email, firstName, lastName }: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const newUser = await ctx.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
      },
    });

    return newUser;
  }
}
