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
// import { PostCreateInput } from "./PostResolver";
import { User } from "../entities/User";
import { Context } from "../utils/context";
import { UserCreateInput } from "./types/UserCreateInput";
import { UserInputError } from "apollo-server";
import { generateToken } from "../utils/generateToken";
import { LooseObject } from "../interfaces/Types";
import bcrypt from "bcryptjs";
// import { isAuth } from "../utils/isAuth";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() ctx: Context) {
    const users = await ctx.prisma.user.findMany({
      include: {
        projects: true,
      },
    });

    return users;
  }

  @Query(() => User, { nullable: true })
  async userById(@Arg("id") id: string, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        projects: true,
      },
    });

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    { email, firstName, lastName, password, confirmPassword }: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    let errors: LooseObject = {};

    try {
      if (email.trim() === "") {
        errors.email = "Email cannot be empty";
      }

      if (password.length < 6) {
        errors.password = "Password must be atleast 6 characters";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
      }

      // Make sure email doesnt already exist
      const emailExists = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        errors.email = "Email is taken";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      // Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      // Create user
      const newUser = await ctx.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
        },
      });

      const token = generateToken(newUser);

      return { ...newUser, token: token };
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Query(() => User, { nullable: true })
  async checkAuthentication(@Arg("id") id: string, @Ctx() ctx: Context) {
    console.log(ctx);
    // const currentUser = isAuth(ctx);

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        projects: true,
      },
    });

    return user;
  }
}
