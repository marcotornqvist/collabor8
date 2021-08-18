import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Social } from "../types/Social";
import { User } from "../types/User";
import { Project } from "../types/Project";
import { isAuth } from "../utils/isAuth";
import { Context, LooseObject } from "../types/Interfaces";
import {
  githubValidator,
  instagramValidator,
} from "./validations/socialValidator";
import { SocialInputs } from "./inputs/SocialInputs";
import { UserInputError } from "apollo-server-express";

// TODO: Resolvers to be implemented:
// createSocials:     Create all socials for a user
// updateSocials:     Update all socials for a user
// socialsByUserId:   Return all socials by userId

// This resolver handles the updating of social accounts
@Resolver(Social)
export class SocialResolver {
  // Create a resolver that checks if user is authorized (isAuth middleware)
  // validate: Check that user is updating its own socials.
  // validate: Validate to check if social links are correct to what they should
  // format them in the right way before saving them.
  // Also do error handling
  @Mutation(() => Social, {
    description: "Create socials",
  })
  @UseMiddleware(isAuth)
  async createSocials(
    @Arg("data") { instagram, github }: SocialInputs,
    @Ctx() { payload, prisma }: Context
  ): Promise<Social> {
    let errors: LooseObject = {};

    try {
      if (instagramValidator(instagram).error) {
        errors.instagram = instagramValidator(instagram).error;
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const socials = await prisma.social.create({
        data: {
          userId: payload!.userId,
          instagram: instagramValidator(instagram).input,
          github,
        },
      });

      return socials;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }
}
