import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Social } from "../entities/Social";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { isAuth } from "../utils/isAuth";
import { Context, LooseObject } from "../types/Interfaces";

// TODO: Resolvers to be implemented:
// socials:      Return all socials
// saveSocials:  Update all socials if they one has changed

// This resolver handles the updating of social accounts
@Resolver(Social)
export class SocialResolver {
  // Create a resolver that checks if user is authorized (isAuth middleware)
  // validate: Check that user is updating its own socials.
  // validate: Validate to check if social links are correct to what they should
  // format them in the right way before saving them.
  // Also do error handling
  // @Mutation(() => Social, {
  //   description: "Update/save all socials",
  // })
  // @UseMiddleware(isAuth)
  // async saveSocials(@Ctx() { payload, prisma }: Context) {
  //   const socials = await prisma.social.findUnique({
  //     where: {
  //       id: payload!.userId,
  //     },
  //   });
  //   return socials;
  // }
}
