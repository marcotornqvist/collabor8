import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { UserInputError } from "apollo-server-express";
import { hash, compare } from "bcryptjs";
import { User } from "../entities/User";
import { Context, LooseObject } from "../types/Interfaces";
import { LoginInput, RegisterInput } from "../types/inputs/UserInput";
import { AuthResponse } from "../types/responses/UserResponse";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { isAuth } from "../utils/isAuth";

// TODO: Remember to implement pagination/infinite scroll both on the back/front end
// so that a query like getAllUsers doesn't return the whole database but instead the first 100

// TODO: Resolvers to be implemented:
// users:         Return all users - In Progress (pagination and filtering)
// userbyId:      Return a single user by id - In Progress ()
// loggedInUser:  Return the currently logged in user - Done
// register:      Create a new user - Done
// login:         Login to existing user - Done
// logout:        Logout from the current user - Done

// This resolver handles all the user actions such as register & login
@Resolver(User)
export class UserResolver {
  @Query(() => [User], {
    description: "Returns all users",
  })
  async users(@Ctx() { prisma }: Context) {
    const users = await prisma.user.findMany({
      // include: {
      //   projects: true,
      // },
    });

    return users;
  }

  @Query(() => User, {
    nullable: true,
    description: "Returns a single user by ID",
  })
  async userById(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  @Query(() => User, {
    description: `Returns the "user" data for the user that is currently logged in `,
  })
  @UseMiddleware(isAuth)
  async loggedInUser(@Ctx() { payload, prisma }: Context) {
    const user = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  @Mutation(() => AuthResponse, { description: "Creates a new User" })
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
          // firstName,
          // lastName,
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

  @Mutation(() => AuthResponse, {
    description: "Login to a already existing account",
  })
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() { res, prisma }: Context
  ): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        profile: true,
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

  @Mutation(() => Boolean, {
    description: "Logout from the currently logged in account",
  })
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }

  // @Mutation(() => Boolean, {description: "Revoke the refreshToken which will sign a user out by id "})
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
