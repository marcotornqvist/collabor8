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
import { Context } from "../types/Interfaces";
import { isAuth } from "../utils/isAuth";
import { CreateProjectInput } from "./inputs/ProjectInput";

// Queries/mutations to be implemented:
// projects:                  Return all projects - In Progress (implement pagination)
// projectById:               Return single project by projectId - In Progress (implement pagination)
// projectsByUserId:          Return all projects by userId - In Progress (implement pagination)
// projectsByloggedInUser:    Return projects by loggedInUser - In Progress
// createProject:             Create new project - In Progress
// deleteProject:             Delete a project by id - Done
// LeaveProject:              Leave a project by id - Done
// updateProject:
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
        members: {
          some: {
            userId: id,
          },
        },
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
        members: {
          some: {
            userId: payload?.userId,
          },
        },
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
        disciplines: {
          connect: disciplines?.map((item) => ({ id: item })) || [],
        },
        // Add members to the project and set the logged in user as "ADMIN"
        members: {
          create: { userId: payload!.userId, role: "ADMIN" },
          createMany: {
            data: members?.map((item) => ({ userId: item })) || [],
          },
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
      include: {
        members: {
          where: {
            status: "TRUE",
          },
        },
      },
    });

    if (!project) {
      throw new UserInputError("Project doesn't exist.");
    }

    // Returns the logged in user
    const currentUser = project.members.find(
      (item) => item.userId === payload!.userId
    );

    if (!currentUser) {
      throw new UserInputError("You are not part of the project");
    }

    if (currentUser.role === "ADMIN") {
      // Project is deleted by id
      const projectDeleted = await prisma.project.delete({
        where: {
          id,
        },
      });

      // Returns all other members
      const otherMembers = project.members.filter(
        (item) => item.userId !== payload!.userId
      );

      // Send a notification to other members that the project has been deleted
      if (otherMembers.length > 0 && projectDeleted) {
        await prisma.notification.createMany({
          data:
            otherMembers.map((item) => ({
              userId: item.userId,
              message: `${project.title} has been deleted`,
            })) || [],
        });
      }
    } else {
      throw new Error("You are not the Admin of this project");
    }

    return true;
  }

  // Leave Project
  @Mutation(() => Boolean, { description: "Leave Project by projectId" })
  @UseMiddleware(isAuth)
  async leaveProject(
    @Arg("id") id: string,
    @Ctx()
    { payload, prisma }: Context
  ) {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        members: {
          orderBy: {
            assignedAt: "asc",
          },
          where: {
            status: {
              in: ["TRUE"],
            },
          },
        },
      },
    });

    if (!project) {
      throw new UserInputError("Project doesn't exist");
    }

    // Returns the logged in user
    const currentUser = project.members.find(
      (item) => item.userId === payload!.userId
    );

    if (!currentUser) {
      throw new UserInputError("You are not part of the project");
    }

    // Returns all other members
    const otherMembers = project.members.filter(
      (item) => item.userId !== payload!.userId
    );

    // Check if logged in user is Admin
    if (currentUser.role === "ADMIN") {
      // Check if there are other members if not delete project
      if (otherMembers.length > 0) {
        // Update the oldest member besides the previous admin, as the new admin of the project
        const updateMember = await prisma.member.update({
          where: {
            userId_projectId: {
              userId: otherMembers[0].userId,
              projectId: id,
            },
          },
          data: {
            role: "ADMIN",
          },
        });

        if (updateMember) {
          // Delete the previous admin
          await prisma.member.delete({
            where: {
              userId_projectId: {
                userId: payload!.userId,
                projectId: id,
              },
            },
          });

          // Send a notification to the new Admin
          await prisma.notification.create({
            data: {
              userId: updateMember.userId,
              message: `You have been assigned as admin of ${project.title}`,
            },
          });
        }
      } else {
        // Delete project if no otherMembers
        await prisma.project.delete({
          where: {
            id,
          },
        });
      }
    } else {
      // Delete logged in member from project
      await prisma.member.delete({
        where: {
          userId_projectId: {
            userId: payload!.userId,
            projectId: id,
          },
        },
      });
    }

    return true;
  }
}
