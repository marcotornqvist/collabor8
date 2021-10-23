import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./User";
import { NotificationCode } from ".prisma/client";

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  senderId?: string | null;

  @Field(() => String, { nullable: true })
  projectId?: string | null;

  @Field(() => User, { nullable: true })
  receiver?: User | null;

  @Field(() => ID)
  receiverId: string;

  @Field(() => NotificationCode)
  notificationCode: NotificationCode;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

registerEnumType(NotificationCode, {
  name: "NotificationCode",
  description: "Notification Code enum ",
});
