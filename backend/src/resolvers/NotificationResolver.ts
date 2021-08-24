import "reflect-metadata";
import { Resolver, Ctx, UseMiddleware, Query, Mutation } from "type-graphql";
import { Context } from "../types/Interfaces";
import { isAuth } from "../utils/isAuth";
import { Notification } from "../types/Notification";
import { User } from "../types/User";

@Resolver(() => Notification)
export class NotificationResolver {
  @Query(() => User, {
    description:
      "Query all notifications, project invitations & friend requests",
    nullable: true,
  })
  @UseMiddleware(isAuth)
  async notifsByLoggedInUser(@Ctx() { payload, prisma }: Context) {
    const notifications = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      select: {
        member: {
          where: {
            status: {
              in: ["PENDING"],
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
        contactsRcvd: {
          orderBy: {
            updatedAt: "desc",
          },
        },
        notifications: {
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    return notifications;
  }
}

// // Send a notification to the members that were invited
// if (project.members.length > 0) {
//   await prisma.notification.createMany({
//     data:
//       project.members?.map((item) => ({
//         userId: item.userId,
//         message: `You have been invited to join ${project.title}`,
//       })) || [],
//   });
// }
