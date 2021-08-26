import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Message } from "../types/Message";
import { User } from "../types/User";
import { Project } from "../types/Project";
import { isAuth } from "../utils/isAuth";
import { Context, LooseObject } from "../types/Interfaces";

// TODO: Queries/mutations to be implemented:
// messagesByProjectId:   Return all messages by projectId
// sendMessageToGroup:    Sends a new message to a group(messages) by projectId
// sendMessageToContact:  Sends a new message to another contact

// This resolver handles all the message actions both in the groupChats and contact Messages
@Resolver(Message)
export class MessageResolver {
  // Create a resolver that checks if user is authorized (isAuth middleware)
  // then return all messages in a certain project
  // validate: Check that user is a part of the project or the owner.
  // validate: Return only projects that are not disabled
  @Query(() => Project, {
    nullable: true,
    description: "Return messages for a single project by projectId",
  })
  @UseMiddleware(isAuth)
  async messagesByProjectId(@Ctx() { payload, prisma }: Context) {
    const user = await prisma.project.findUnique({
      where: {
        id: payload!.userId,
      },
      // include: {
      //   projects: true,
      // },
    });

    return user;
  }
}
