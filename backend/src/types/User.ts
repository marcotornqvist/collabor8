import "reflect-metadata";
import { ObjectType, Field, ID, Int, registerEnumType } from "type-graphql";
import { IsEmail, MinLength, Length, IsLowercase } from "class-validator";
import { Profile } from "./Profile";
import { Social } from "./Social";
import { Project } from "./Project";
import { Contact } from "./Contact";
import { Member } from "./Member";
import { Message } from "./Message";
import { Notification } from "./Notification";
import { BlockedUser } from "./BlockedUser";
import { ReportUser } from "./Report";
// import { StatusCode } from "./Enums";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @IsLowercase()
  @Length(3, 50)
  @Field(() => String)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => Social, { nullable: true })
  socials?: Social | null;

  @Field(() => [Project], { nullable: true })
  projects?: Project[] | null;

  @Field(() => [Member], { nullable: true })
  member?: Member[] | null;

  @Field(() => [Contact], { nullable: true })
  contactsSent?: Contact[] | null;

  @Field(() => [Contact], { nullable: true })
  contactsRcvd?: Contact[] | null;

  @Field(() => [Message], { nullable: true })
  Messages?: Message[] | null;

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[] | null;

  @Field(() => [BlockedUser], { nullable: true })
  blockedUsers?: BlockedUser[] | null;

  @Field(() => [ReportUser], { nullable: true })
  reports?: ReportUser[] | null;

  @Field(() => Int)
  tokenVersion: number;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

// registerEnumType(StatusCode, {
//   name: "StatusCode",
//   description: "Status Code enum",
// });
