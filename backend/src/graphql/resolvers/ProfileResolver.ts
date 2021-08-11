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
import { Profile } from "../entities/Profile";
import { Context, LooseObject } from "../types/Interfaces";
import { LoginInput, RegisterInput } from "./inputs/UserInput";
import { AuthResponse } from "./responses/UserResponse";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { isAuth } from "../utils/isAuth";

// TODO: Resolvers to be implemented:
// users:         Return all users - In Progress (pagination and filtering)
// userbyId:      Return a single user by id - In Progress ()

// This resolver handles all the user actions such as register & login
@Resolver(Profile)
export class ProfileResolver {
  // @Query(() => User, {
  //   nullable: true,
  //   description: "Returns a single user by ID",
  // })
  // async userById(@Arg("id") id: string, @Ctx() { prisma }: Context) {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return user;
  // }
  // @Mutation(() => AuthResponse, {
  //   description: "Login to a already existing account",
  // })
  // async login(
  //   @Arg("data")
  //   { email, password }: LoginInput,
  //   @Ctx() { res, prisma }: Context
  // ): Promise<AuthResponse> {
  // }
}
