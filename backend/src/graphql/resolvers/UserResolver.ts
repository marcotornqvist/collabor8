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
  UseMiddleware,
} from "type-graphql";
// import { PostCreateInput } from "./PostResolver";
import { UserInputError } from "apollo-server-express";
import { hash, compare } from "bcryptjs";
import { User } from "../entities/User";
import { Context, LooseObject } from "./types/Interfaces";
import { LoginInput, RegisterInput } from "./types/UserInput";
import { AuthResponse } from "./types/AuthResponse";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { isAuth } from "../utils/isAuth";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: Context) {
    const users = await prisma.user.findMany({
      // include: {
      //   projects: true,
      // },
    });

    return users;
  }

  @Query(() => User, { nullable: true })
  async userById(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        projects: {
          include: {
            messages: true,
          },
        },
      },
    });

    return user;
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async loggedInUser(@Ctx() { payload, prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      // include: {
      //   projects: true,
      // },
    });

    return user;
  }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("data")
    { email, firstName, lastName, password, confirmPassword }: RegisterInput,
    @Ctx() { res, prisma }: Context
  ): Promise<AuthResponse> {
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
      const emailExists = await prisma.user.findUnique({
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
      password = await hash(password, 12);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
        },
      });

      sendRefreshToken(res, createRefreshToken(newUser));

      return {
        accessToken: createAccessToken(newUser),
        user: newUser,
      };
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() { res, prisma }: Context
  ): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UserInputError(
        "The email or password you entered is incorrect"
      );
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new UserInputError(
        "The email or password you entered is incorrect"
      );
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }

  // @Mutation(() => Boolean)
  // async revokeRefreshTokensForUser(
  //   @Arg("id") id: string,
  //   @Ctx() { prisma }: Context
  // ): Promise<Boolean> {
  //   await prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       tokenVersion: {
  //         increment: 1,
  //       },
  //     },
  //   });

  //   return true;
  // }
}
