import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Length } from "class-validator";
import { Project } from "./Project";
import { Contact } from "./Contact";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Length(1, 255)
  @Field(() => String)
  body: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID, { nullable: true })
  userId?: string | null;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => ID, { nullable: true })
  projectId?: string | null;

  @Field(() => Contact, { nullable: true })
  contact?: Contact | null;

  @Field(() => ID, { nullable: true })
  contactId?: string | null;

  @Field(() => Date)
  createdAt: Date;
}
