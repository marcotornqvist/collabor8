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
import { isAuth } from "../utils/isAuth";
import { Context, FormErrors } from "../types/Interfaces";
import { SocialInput } from "./inputs/SocialInput";
import { validateFields } from "../validations/validateFields";
import { UpdateSocialsValidationSchema } from "../validations/schemas";
import { UserInputError } from "apollo-server-express";

// TODO: Queries/mutations to be implemented:
// updateSocials:           Update all socials for a user
// socialsByLoggedInUser    Get all socials by logged in user
// socialsByUserId:         Return all socials by userId

// This resolver handles the updating of social accounts
@Resolver(Social)
export class SocialResolver {
  @Query(() => Social, {
    description: `Returns the social data for the user that is currently logged in `,
  })
  @UseMiddleware(isAuth)
  async socialsByLoggedInUser(@Ctx() { payload, prisma }: Context) {
    const social = await prisma.social.findUnique({
      where: {
        userId: payload!.userId,
      },
    });

    return social;
  }

  @Query(() => Social, {
    description: `Returns the social data by user id`,
  })
  async socialsByUserId(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const social = await prisma.social.findUnique({
      where: {
        userId: id,
      },
    });

    return social;
  }

  @Mutation(() => Social, {
    description: "Update socials",
  })
  @UseMiddleware(isAuth)
  async updateSocials(
    @Arg("data")
    data: SocialInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Social> {
    // Validate the input fields
    const errors: FormErrors = await validateFields<SocialInput>({
      fields: data,
      validationSchema: UpdateSocialsValidationSchema,
    });

    try {
      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const socials = await prisma.social.update({
        where: {
          userId: payload!.userId,
        },
        data: data,
      });

      return socials;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }
}
