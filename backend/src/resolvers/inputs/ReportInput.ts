import "reflect-metadata";
import { InputType, Field, ID } from "type-graphql";
import { Violation } from ".prisma/client";
import { MaxLength, Length } from "class-validator";

@InputType({ description: "Input argument types for reporting a user" })
export class ReportUserInput {
  @Field(() => Violation)
  violation: Violation;

  @Length(10, 255)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String)
  body: string;

  @Field(() => String)
  userId: string;
}

@InputType({ description: "Input argument types for reporting a project" })
export class ReportProjectInput {
  @Field(() => Violation)
  violation: Violation;

  @Length(10, 255)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String)
  body: string;

  @Field(() => String)
  projectId: string;
}
