import "reflect-metadata";
import { Resolver, Query, Ctx, UseMiddleware, Arg } from "type-graphql";
import { Project } from "../types/Project";
import { UserInputError } from "apollo-server-express";
import { User } from "../types/User";
import { Context, LooseObject } from "../types/Interfaces";
import { isAuth } from "../utils/isAuth";

// Resolvers to be implemented:
// projects:                  Return all projects - In Progress (implement pagination)
// projectById:               Return single project by projectId - In Progress (implement pagination)
// projectsByUserId:          Return all projects by userId - In Progress (implement pagination)
// projectsByloggedInUser:    Return projects by loggedInUser - In Progress
// Create new project
// Delete project by id (if creator)
// Leave project (if not creator)
// Disable project by id (if creator)
// Add member to project by Id (if creator)
// Report project by id (sends email to me)

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project], {
    nullable: true,
    description: "Returns all projects that are not disabled",
  })
  async projects(@Ctx() { prisma }: Context) {
    const projects = await prisma.project.findMany({
      where: {
        disabled: false,
      },
    });

    return projects;
  }

  @Query(() => Project, {
    nullable: true,
    description: "Return project by projectId",
  })
  async projectById(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const project = await prisma.project.findFirst({
      where: {
        id,
        disabled: false,
      },
    });

    return project;
  }

  @Query(() => [Project], {
    nullable: true,
    description: "Return all projects by userId which are not disabled",
  })
  async projectsByUserId(@Arg("id") id: string, @Ctx() { prisma }: Context) {
    const projects = await prisma.project.findMany({
      where: {
        userId: id,
        disabled: false,
      },
    });

    return projects;
  }

  // Create a resolver that returns all projects for the loggedInUser
  @Query(() => [Project], {
    nullable: true,
    description: "Return all projects for the currently logged in user",
  })
  @UseMiddleware(isAuth)
  async projectsByloggedInUser(@Ctx() { payload, prisma }: Context) {
    const projects = await prisma.project.findMany({
      where: {
        userId: payload?.userId,
      },
    });

    return projects;
  }
}
