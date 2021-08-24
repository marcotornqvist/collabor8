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
import { Context, LooseObject } from "../types/Interfaces";
import { validateSocials } from "./validations/socialValidator";
import { SocialInput } from "./inputs/SocialInput";

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
    description: `Returns the social data for the user that is currently logged in `,
  })
  @UseMiddleware(isAuth)
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
    {
      instagram,
      linkedin,
      dribbble,
      behance,
      pinterest,
      soundcloud,
      spotify,
      medium,
      vimeo,
      youtube,
      github,
      discord,
    }: SocialInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Social> {
    // Destructuring values returned in function that validates all social usernames
    const validated = validateSocials(
      instagram,
      linkedin,
      dribbble,
      behance,
      pinterest,
      soundcloud,
      spotify,
      medium,
      vimeo,
      youtube,
      github,
      discord
    );

    const socials = await prisma.social.update({
      where: {
        userId: payload!.userId,
      },
      data: {
        instagram: validated.instagram,
        linkedin: validated.linkedin,
        dribbble: validated.dribbble,
        behance: validated.behance,
        pinterest: validated.pinterest,
        soundcloud: validated.soundcloud,
        spotify: validated.spotify,
        medium: validated.medium,
        vimeo: validated.vimeo,
        youtube: validated.youtube,
        github: validated.github,
        discord: validated.discord,
      },
    });

    return socials;
  }
}
