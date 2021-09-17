import "reflect-metadata";
import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType({ description: "Update Profile Input" })
export class UpdateProfileInput {
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @MaxLength(500)
  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => Number, { nullable: true })
  disciplineId?: number | null;
}

@InputType({ description: "File Arguments" })
export class FileArgs {
  @Field(() => String)
  filename: string;

  @Field(() => String)
  mimetype: string;

  @Field(() => String)
  encoding: string;

  @Field(() => String)
  stream?: any;
}
