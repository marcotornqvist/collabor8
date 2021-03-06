import "reflect-metadata";
import { MaxLength } from "class-validator";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Social {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  instagram?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  linkedin?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  dribbble?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  behance?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  pinterest?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  soundcloud?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  spotify?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  medium?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  vimeo?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  youtube?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  github?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  discord?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
