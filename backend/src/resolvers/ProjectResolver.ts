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
import { Member } from "../types/Member";
import { Context, LooseObject } from "../types/Interfaces";
import {
  MemberInput,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectsFilterArgs,
  PaginationUserArgs,
} from "./inputs/ProjectInput";
import { PaginationArgs } from "./inputs/GlobalInputs";
import { UserInputError, ForbiddenError } from "apollo-server-express";
import { isAuth } from "../utils/isAuth";
import countries from "../data/countries";
import { pagination } from "../utils/pagination";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { NotificationCode } from "@prisma/client";

// Queries/mutations to be implemented:
// projects:                  Return all projects - Done
// projectById:               Return single project by projectId - Done
// projectsByUserId:          Return all projects by userId - Done
// projectsByloggedInUser:    Return projects by loggedInUser - Done
// createProject:             Create new project - Done
// deleteProject:             Delete a project by id - Done
// leaveProject:              Leave a project by id - Done
// updateProjectDetails:      Update project detais - Done
// addMember:                 Add member to project by Id - Done
// deleteMember:              Delete member to project by Id - Done
// toggleProjectDisabled:     Toggle a project disabled boolean state - Done
// acceptInvite:              Accept Invitation to a project - Done
// rejectInvite:              Rejects Invitation to a project - Done

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project], {
    nullable: true,
    description: "Returns all projects that are not disabled",
  })
  async projects(
    @Arg("data")
    {
      searchText,
      disciplines,
      country,
      after,
      before,
      first,
      last,
      sort,
    }: ProjectsFilterArgs,
    @Ctx() { prisma }: Context
  ) {
    const filters = {};

    if (searchText) {
      Object.assign(filters, {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { body: { contains: searchText, mode: "insensitive" } },
        ],
      });
    }

    if (disciplines && disciplines.length > 0) {
      Object.assign(filters, {
        disciplines: {
          some: {
            id: {
              in: disciplines,
            },
          },
        },
      });
    }

    // Returns projects based on country filter
    const countryExists = countries.filter((item) => item.country === country);

    if (countryExists.length > 0) {
      Object.assign(filters, {
        country,
      });
    }

    return prisma.project.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        ...filters,
        disabled: false,
      },
      include: {
        disciplines: true,
      },
      orderBy: { createdAt: sort || "desc" },
    });
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
  async projectsByUserId(
    @Arg("data") { id, after, before, first, last }: PaginationUserArgs,
    @Ctx() { prisma }: Context
  ) {
    const projects = await prisma.project.findMany({
      ...pagination({ after, before, first, last }),
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
  async projectsByloggedInUser(
    @Arg("data") { after, before, first, last }: PaginationArgs,
    @Ctx() { payload, prisma }: Context
  ) {
    const projects = await prisma.project.findMany({
      ...pagination({ after, before, first, last }),
      where: {
        members: {
          some: {
            userId: payload!.userId,
          },
        },
      },
    });

    return projects;
  }

  @Mutation(() => Project, { description: "Creates a new Project" })
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("data")
    { title, body, country, disciplines, members }: CreateProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Project> {
    let errors: LooseObject = {};
    try {
      title = capitalizeFirstLetter(title.trim());
      body = body ? capitalizeFirstLetter(body.trim()) : null;

      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
      }

      if (title.length < 1 && title.length > 50) {
        errors.title = "Title cannot be empty or more than 50 characters";
      }

      if (body && body.length > 1000) {
        errors.body = "Description cannot be more than 1000 characters";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const project = await prisma.project.create({
        data: {
          title,
          body,
          country,
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
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
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
      throw new ForbiddenError("You are not a member of the project");
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
          data: otherMembers.map((item) => ({
            projectId: id,
            receiverId: item.userId,
            notificationCode: NotificationCode.PROJECT_DELETED,
          })),
        });
      }
    } else {
      throw new ForbiddenError("You are not the Admin of this project");
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
      throw new ForbiddenError("Not Authorized");
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

          // Send a notification to the new Admin that he is the new admin
          await prisma.notification.create({
            data: {
              senderId: payload!.userId,
              projectId: id,
              receiverId: updateMember.userId,
              notificationCode: NotificationCode.ADMIN_ASSIGNED,
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

  // Update Project Details
  @Mutation(() => Project, { description: "Updates a Project by id" })
  @UseMiddleware(isAuth)
  async updateProjectDetails(
    @Arg("data")
    { id, title, body, country, disciplines }: UpdateProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Project> {
    let errors: LooseObject = {};
    try {
      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
      }

      if (title.length < 1 && title.length > 50) {
        errors.title = "Title cannot be empty or more than 50 characters";
      }

      if (body && body.length > 1000) {
        errors.body = "Description cannot be more than 1000 characters";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

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
          disciplines: true,
        },
      });

      if (!project) {
        throw new UserInputError("Project doesn't exist.");
      }

      // List that deletes disconnects disciplines
      const removeDisciplines = project.disciplines.filter(
        (item) => !disciplines?.some((item2) => item.id === item2)
      );

      // Returns the logged in user
      const currentUser = project.members.find(
        (item) => item.userId === payload!.userId
      );

      if (!currentUser || currentUser.role !== "ADMIN") {
        throw new ForbiddenError("Not Authorized");
      }

      const updatedProject = await prisma.project.update({
        where: {
          id,
        },
        data: {
          title: title && capitalizeFirstLetter(title.trim()),
          body: body && capitalizeFirstLetter(body.trim()),
          country,
          disciplines: {
            connect: disciplines?.map((item) => ({ id: item })),
            disconnect: removeDisciplines?.map((item) => ({ id: item.id })),
          },
        },
        include: {
          disciplines: true,
        },
      });

      return updatedProject;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => Member, {
    description: "Add member to project, by project id",
  })
  @UseMiddleware(isAuth)
  async addMember(
    @Arg("data") { userId, projectId }: MemberInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Member> {
    // Checks if user is blocked
    const isBlocked = await prisma.blockedUser.findUnique({
      where: {
        userId_blockedUserId: {
          userId: payload!.userId,
          blockedUserId: userId,
        },
      },
    });

    if (isBlocked) throw new Error("Blocked user cannot be added to project");

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) throw new UserInputError("User doesn't exist");

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        members: true,
      },
    });

    if (!project) throw new UserInputError("Project doesn't exist");

    // Returns the logged in user
    const currentUser = project.members.find(
      (item) => item.userId === payload!.userId
    );

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new ForbiddenError("Not Authorized");
    }

    // Checks if member exists
    const memberExists = project.members.find((item) => item.userId === userId);

    if (memberExists) {
      throw new UserInputError("Member already exists");
    }

    const newMember = await prisma.member.create({
      data: {
        userId,
        projectId,
      },
      include: { user: true },
    });

    return newMember;
  }

  @Mutation(() => Boolean, {
    description: "Delete member from project, by project id",
  })
  @UseMiddleware(isAuth)
  async deleteMember(
    @Arg("data") { userId, projectId }: MemberInput,
    @Ctx() { payload, prisma }: Context
  ) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        members: true,
      },
    });

    if (!project) throw new UserInputError("Project doesn't exist");

    // Returns the logged in user
    const currentUser = project.members.find(
      (item) => item.userId === payload!.userId
    );

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new ForbiddenError("Not Authorized");
    }

    // Checks if member exists
    const memberExists = project.members.find((item) => item.userId === userId);

    if (!memberExists) {
      throw new UserInputError("Member doesn't exist");
    }

    await prisma.member.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return true;
  }

  @Mutation(() => Boolean, {
    description: "Toggle Project disabled value to true or false",
  })
  @UseMiddleware(isAuth)
  async toggleProjectDisabled(
    @Arg("projectId") projectId: string,
    @Ctx() { payload, prisma }: Context
  ): Promise<Boolean> {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        members: true,
      },
    });

    if (!project) throw new UserInputError("Project doesn't exist");

    // Returns the logged in user
    const currentUser = project.members.find(
      (item) => item.userId === payload!.userId
    );

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new ForbiddenError("Not Authorized");
    }

    const toggleDisabled = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        disabled: !project.disabled,
      },
      select: {
        disabled: true,
      },
    });

    return toggleDisabled.disabled;
  }

  @Mutation(() => Boolean, {
    description: "Accept a project invitation",
  })
  @UseMiddleware(isAuth)
  async acceptInvite(
    @Arg("projectId") projectId: string,
    @Ctx() { payload, prisma }: Context
  ): Promise<Boolean> {
    const member = await prisma.member.findUnique({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId,
        },
      },
      select: {
        status: true,
      },
    });

    // Checks that the invite exists and that it isn't pending
    if (!member || member.status !== "PENDING")
      throw new Error("Invite doesn't exist");

    await prisma.member.update({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId,
        },
      },
      data: {
        status: "TRUE",
      },
    });

    return true;
  }

  @Mutation(() => Boolean, {
    description: "Delete/decline a project invitation",
  })
  @UseMiddleware(isAuth)
  async rejectInvite(
    @Arg("projectId") projectId: string,
    @Ctx() { payload, prisma }: Context
  ): Promise<Boolean> {
    const member = await prisma.member.findUnique({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId,
        },
      },
      select: {
        status: true,
      },
    });

    if (!member || member.status !== "PENDING")
      throw new UserInputError("Invite doesn't exist");

    await prisma.member.update({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId,
        },
      },
      data: {
        status: "FALSE",
      },
    });

    return true;
  }
}
