import "reflect-metadata";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { ReportProject, ReportUser } from "../types/Report";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import { UserInputError } from "apollo-server-express";
import { ReportUserInput, ReportProjectInput } from "./inputs/ReportInput";
import { LooseObject } from "../types/Interfaces";

// TODO: Queries/mutations to be implemented:
// reportUser - In Progress (implement send email to host)
// reportProject - In Progress (implement send email to host)

@Resolver()
export class ReportResolver {
  @Mutation(() => ReportUser, {
    description: "Report a User by id",
  })
  @UseMiddleware(isAuth)
  async reportUser(
    @Arg("data") { violation, title, body, userId }: ReportUserInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<ReportUser> {
    let errors: LooseObject = {};
    try {
      if (title.length < 10 && title.length > 255) {
        errors.title =
          "Title cannot be less than 10 or more than 255 characters";
      }

      if (body && body.length > 1000) {
        errors.body = "Description cannot be more than 1000 characters";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const userExist = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExist) {
        throw new UserInputError("User doesn't exist");
      }

      const user = await prisma.reportUser.create({
        data: {
          violation,
          title,
          body,
          senderId: payload!.userId,
          userId,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }

  @Mutation(() => ReportProject, {
    description: "Report a Project by id",
  })
  @UseMiddleware(isAuth)
  async reportProject(
    @Arg("data") { violation, title, body, projectId }: ReportProjectInput,
    @Ctx() { payload, prisma }: Context
  ): Promise<ReportProject> {
    let errors: LooseObject = {};
    try {
      if (title.length < 10 && title.length > 255) {
        errors.title =
          "Title cannot be less than 10 or more than 255 characters";
      }

      if (body && body.length > 1000) {
        errors.body = "Description cannot be more than 1000 characters";
      }

      if (Object.keys(errors).length > 0) {
        throw errors;
      }

      const projectExist = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!projectExist) {
        throw new UserInputError("Project doesn't exist");
      }

      const project = await prisma.reportProject.create({
        data: {
          violation,
          title,
          body,
          senderId: payload!.userId,
          projectId,
        },
      });

      return project;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }
}
