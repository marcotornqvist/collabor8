import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Member } from "../entities/Member";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { isAuth } from "../utils/isAuth";
import { Context, LooseObject } from "../types/Interfaces";
import { MemberResponse } from "./responses/MemberResponse";

// TODO: Resolvers to be implemented:
// membersByProject:     Return the owner and all the members by projectId - In Progress
// addMember:            Add member to a project as owner by projectId - In Progress

// This resolver handles all the message actions both in the groupChats and contact Messages
@Resolver(Member)
export class MemberResolver {
  @Query(() => [MemberResponse], {
    nullable: true,
    description:
      "Returns the owner and all the members for a single project by projectId",
  })
  async membersByProjectId(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const project = await prisma.member.findMany({
      where: {
        projectId: id,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    // Recreate this resolver try querying it from the prisma.user model

    return project;
  }
}
