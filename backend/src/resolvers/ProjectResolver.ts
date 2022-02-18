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
import { Context, FormErrors } from "../types/Interfaces";
import {
  MemberInput,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectsFilterArgs,
  PaginationUserArgs,
  ProjectById,
} from "./inputs/ProjectInput";
import { PaginationArgs } from "./inputs/GlobalInputs";
import { UserInputError, ForbiddenError } from "apollo-server-express";
import { isAuth, isAuthOrNot } from "../utils/isAuth";
import { pagination } from "../utils/pagination";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { NotificationCode } from "@prisma/client";
import { validateFields } from "../validations/validateFields";
import { ProjectValidationSchema } from "../validations/schemas";
import countries from "../data/countries";
import { Project_Member_Status } from "../types/Enums";

// Queries/mutations to be implemented:
// projects:                  Return all projects - Done
// projectById:               Return single project by projectId - Done
// projectsByUserId:          Return all projects by userId - Done
// projectsByloggedInUser:    Return projects by loggedInUser - Done
// projectMemberStatus:       Returns member status of user/guest - In Progress
// createProject:             Create new project - Done
// deleteProject:             Delete a project by id - Done
// leaveProject:              Leave a project by id - Done
// updateProject:      Update project detais - Done
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
    const filters = { disciplines: {} };

    if (searchText) {
      Object.assign(filters, {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { body: { contains: searchText, mode: "insensitive" } },
        ],
      });
    }

    if (disciplines && disciplines.length > 0) {
      Object.assign(filters.disciplines, {
        some: {
          id: {
            in: disciplines,
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
        disciplines: {
          include: {
            image: true,
          },
        },
      },
      orderBy: { createdAt: sort || "desc" },
    });
  }

  @Query(() => Project, {
    nullable: true,
    description: "Return project by id",
  })
  async projectById(
    @Arg("data")
    { id, status, role }: ProjectById,
    @Ctx() { prisma }: Context
  ) {
    const project = await prisma.project.findFirst({
      where: {
        id,
        disabled: false,
      },
      include: {
        disciplines: true,
        members: {
          where: {
            role: {
              in: role?.map((item) => item),
            },
            status: {
              in: status?.map((item) => item),
            },
          },
          include: {
            user: {
              include: {
                profile: {
                  include: {
                    discipline: true,
                  },
                },
              },
            },
          },
          orderBy: { role: "asc" },
        },
      },
    });

    if (!project) {
      throw new Error("Project doesn't exist");
    }

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

  @Query(() => Project_Member_Status, {
    nullable: true,
    description: "Returns member status of auth user or not auth guest",
  })
  @UseMiddleware(isAuthOrNot)
  async projectMemberStatus(
    @Arg("id") id: string,
    @Ctx() { payload, prisma }: Context
  ) {
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    // Checks if project exists and if user is logged in or a guest
    if (project && payload?.userId) {
      const result = await prisma.member.findUnique({
        where: {
          userId_projectId: {
            userId: payload!.userId,
            projectId: id,
          },
        },
        select: {
          role: true,
          status: true,
        },
      });

      if (result) {
        const { role, status } = result;

        if (role === "ADMIN" && status === "ACCEPTED") {
          // If user is of role "admin" and has accepted the invite
          return Project_Member_Status.ADMIN;
        } else if (role === "MEMBER" && status === "ACCEPTED") {
          // If user is of role "member" and has accepted the invite
          return Project_Member_Status.MEMBER;
        } else if (status === "PENDING" || status === "REJECTED") {
          // If user is invited or has rejected the invite
          return Project_Member_Status.INVITED_USER;
        }
      }

      // If project exists, user is authenticated and condition above didn't match
      return Project_Member_Status.USER;
    }

    return Project_Member_Status.GUEST;
  }

  @Mutation(() => Project, { description: "Creates a new Project" })
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("data")
    { title, body, country, disciplines, members }: CreateProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Project> {
    title = capitalizeFirstLetter(title.trim());
    body = capitalizeFirstLetter(body.trim());

    // Validate the input fields
    const errors: FormErrors = await validateFields<CreateProjectInput>({
      fields: {
        title,
        body,
      },
      validationSchema: ProjectValidationSchema,
    });

    try {
      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
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
            create: {
              userId: payload!.userId,
              role: "ADMIN",
              status: "ACCEPTED",
            },
            createMany: {
              data: members?.map((item) => ({ userId: item })) || [],
            },
          },
        },
        include: {
          disciplines: true,
          members: {
            where: {
              status: "ACCEPTED",
            },
            include: {
              user: {
                include: {
                  profile: {
                    include: {
                      discipline: true,
                    },
                  },
                },
              },
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
            status: "ACCEPTED",
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
            status: "ACCEPTED",
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
          // Set logged in user status as "LEFT", meaning that user left the project
          await prisma.member.update({
            where: {
              userId_projectId: {
                userId: payload!.userId,
                projectId: id,
              },
            },
            data: {
              status: "LEFT",
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

  // Update Project
  @Mutation(() => Project, { description: "Updates a Project by id" })
  @UseMiddleware(isAuth)
  async updateProject(
    @Arg("data")
    { id, title, body, country, disciplines }: UpdateProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<Project> {
    // Validate the input fields
    const errors: FormErrors = await validateFields<
      Omit<UpdateProjectInput, "id">
    >({
      fields: {
        title,
        body,
      },
      validationSchema: ProjectValidationSchema,
    });

    try {
      const countryExists = countries.filter(
        (item) => item.country === country
      );

      if (countryExists.length < 1) {
        country = null;
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const project = await prisma.project.findFirst({
        where: {
          id,
          members: {
            some: {
              userId: payload!.userId,
              role: "ADMIN",
            },
          },
        },
        include: {
          disciplines: true,
        },
      });

      if (!project) {
        throw new UserInputError("Project doesn't exist");
      }

      // Array that disconnects disciplines from project
      const disciplinesToBeRemoved = project.disciplines.filter(
        (item) => !disciplines?.some((el) => item.id === el)
      );

      const updatedProject = await prisma.project.update({
        where: {
          id,
        },
        data: {
          title: capitalizeFirstLetter(title.trim()),
          body: capitalizeFirstLetter(body.trim()),
          country,
          disciplines: {
            connect: disciplines?.map((item) => ({ id: item })),
            disconnect: disciplinesToBeRemoved?.map((item) => ({
              id: item.id,
            })),
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

    // Check if member field already exists with a status of kicked
    const isKickedMember = await prisma.member.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      select: {
        status: true,
      },
    });

    // If member object already exists with a status of kicked
    // Member status gets updated to pending and is returned
    if (isKickedMember?.status === "KICKED") {
      // If member object exists, member status gets updated to pending
      // Meaning that the user has received a new invite to the project
      const updatedMember = await prisma.member.update({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
        data: {
          status: "PENDING",
        },
        include: { user: true },
      });

      return updatedMember;
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) throw new UserInputError("User doesn't exist");

    // Checks if project exists
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

    // Checks if user is authorized to add member to a specific project
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
      include: {
        user: {
          include: {
            profile: {
              include: {
                discipline: true,
              },
            },
          },
        },
      },
    });

    return newMember;
  }

  @Mutation(() => Boolean, {
    description: "Kick member from project, by project id",
  })
  @UseMiddleware(isAuth)
  async kickMember(
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

    await prisma.member.update({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      data: {
        status: "KICKED",
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

    // If invite doesn't exist or the status is "ACCEPTED" or "KICKED", return error
    if (!member || member.status === "ACCEPTED" || member.status === "KICKED")
      throw new Error("Invite doesn't exist");

    await prisma.member.update({
      where: {
        userId_projectId: {
          userId: payload!.userId,
          projectId,
        },
      },
      data: {
        status: "ACCEPTED",
      },
    });

    return true;
  }

  @Mutation(() => Boolean, {
    description: "Reject a project invitation",
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
        status: "REJECTED",
      },
    });

    return true;
  }
}
