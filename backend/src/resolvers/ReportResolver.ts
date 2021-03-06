import "reflect-metadata";
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { ReportProject, ReportUser } from "../types/Report";
import { isAuth } from "../utils/isAuth";
import { Context } from "../types/Interfaces";
import { UserInputError } from "apollo-server-express";
import { ReportUserInput, ReportProjectInput } from "./inputs/ReportInput";
import { FormErrors } from "../types/Interfaces";
import { validateFields } from "../validations/validateFields";
import { ReportValidationSchema } from "../validations/schemas";
import { sendEmail } from "../helpers/sendEmail";

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
    // Validate the input fields
    const errors: FormErrors = await validateFields<
      Omit<ReportUserInput, "userId">
    >({
      fields: {
        violation,
        title,
        body,
      },
      validationSchema: ReportValidationSchema,
    });

    try {
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

      if (user) {
        await sendEmail(
          "User Reported",
          `Sender ID: ${user.senderId} 
          \nreported User ID: ${user.userId}
          \ntitle: ${user.title}
          \nbody: ${user.body}
          \nviolation: ${user.violation}
          `
        );
      }

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
    // Validate the input fields
    const errors: FormErrors = await validateFields<
      Omit<ReportProjectInput, "projectId">
    >({
      fields: {
        violation,
        title,
        body,
      },
      validationSchema: ReportValidationSchema,
    });

    try {
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
          body: body,
          senderId: payload!.userId,
          projectId,
        },
      });

      if (project) {
        await sendEmail(
          "Project Report",
          `Sender ID: ${project.senderId} 
          \nreported Project ID: ${project.projectId}
          \ntitle: ${project.title}
          \nbody: ${project.body}
          \nviolation: ${project.violation}
          `
        );
      }

      return project;
    } catch (err) {
      console.log(err);
      throw new UserInputError("Errors", { errors });
    }
  }
}
