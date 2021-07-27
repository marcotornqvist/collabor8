import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from "type-graphql";
// import { Post } from "./Post";
import { User } from "../types/User";
import { Context } from "../context";
// import { PostCreateInput } from "./PostResolver";

@InputType({ description: "The data for a new recipe" })
class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @Mutation(() => User)
  async addUser(
    @Arg("data") { email, name }: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const newUser = await ctx.prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return newUser;
  }
}
