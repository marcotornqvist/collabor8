import "reflect-metadata";
import { Resolver, Ctx, UseMiddleware, Query, Arg } from "type-graphql";
import { Context } from "../types/Interfaces";
import { isAuth } from "../utils/isAuth";
import { Notification } from "../types/Notification";
import { User } from "../types/User";
import { pagination } from "../utils/pagination";
import { PaginationArgs } from "./inputs/GlobalInputs";

@Resolver(() => Notification)
export class NotificationResolver {
  @Query(() => User, {
    description:
      "Query all notifications, project invitations & friend requests for logged in user",
    nullable: true,
  })
  @UseMiddleware(isAuth)
  async notificationsByLoggedInUser(
    @Arg("data") { after, before, first, last }: PaginationArgs,
    @Ctx() { payload, prisma }: Context
  ) {
    const notifications = await prisma.user.findUnique({
      where: {
        id: payload!.userId,
      },
      select: {
        // Returns all pending projects requests
        memberOf: {
          where: {
            status: {
              in: ["PENDING"],
            },
            project: {
              disabled: false,
            },
          },
          select: {
            project: {
              select: {
                title: true,
                id: true,
              },
            },
          },
          orderBy: {
            assignedAt: "desc",
          },
        },
        // Returns all pending contact requests
        contactsRcvd: {
          where: {
            status: {
              in: ["PENDING"],
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        // Returns all notifications
        notifications: {
          ...pagination({ after, before, first, last }),
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Mark notifications as read
    if (
      notifications?.notifications &&
      notifications?.notifications.length > 0
    ) {
      await prisma.notification.updateMany({
        where: {
          receiverId: payload!.userId,
          read: false,
        },
        data: {
          read: true,
        },
      });
    }

    return notifications;
  }
}
