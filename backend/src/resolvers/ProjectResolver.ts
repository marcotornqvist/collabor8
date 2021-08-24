import "reflect-metadata";
import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  Arg,
  Mutation,
} from "type-graphql";
import { Project } from "../types/Project";
import { UserInputError } from "apollo-server-express";
import { User } from "../types/User";
import { Context, LooseObject } from "../types/Interfaces";
import { isAuth } from "../utils/isAuth";
import { CreateProjectInput } from "./inputs/ProjectInput";
import { Discipline } from "../types/Discipline";

// Queries/mutations to be implemented:
// projects:                  Return all projects - In Progress (implement pagination)
// projectById:               Return single project by projectId - In Progress (implement pagination)
// projectsByUserId:          Return all projects by userId - In Progress (implement pagination)
// projectsByloggedInUser:    Return projects by loggedInUser - In Progress
// Create new project
// Delete project by id (if creator)
// Leave project
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

  // Create new project
  @Mutation(() => Project, { description: "Creates a new Project" })
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("data")
    { title, body, disciplines, members }: CreateProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Project> {
    const project = await prisma.project.create({
      data: {
        title,
        body,
        owner: {
          connect: {
            id: payload!.userId,
          },
        },
        disciplines: {
          connect: disciplines?.map((item) => ({ id: item })) || [],
        },
        members: {
          create: members?.map((item) => ({ userId: item })) || [],
        },
      },
      include: {
        disciplines: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    // Initialize row in ChatRoom table based on the new projectId
    if (project) {
      await prisma.chatRoom.create({
        data: {
          projectId: project.id,
        },
      });
    }

    return project;
  }

  // Delete Project
  @Mutation(() => Boolean, { description: "Deletes a Project by projectId" })
  @UseMiddleware(isAuth)
  async deleteProject(
    @Arg("id") id: string,
    @Ctx()
    { payload, prisma }: Context
  ) {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      throw new UserInputError("Project doesn't exist.");
    }

    if (project?.userId === payload!.userId) {
      await prisma.project.delete({
        where: {
          id,
        },
      });
    } else {
      throw new UserInputError("Current user is not the owner the project.");
    }

    return true;
  }
}
