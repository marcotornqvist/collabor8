import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Social {
  @Field(() => ID)
  userId: string;

  @Field(() => String, { nullable: true })
  instagram?: string | null;

  @Field(() => String, { nullable: true })
  linkedin?: string | null;

  @Field(() => String, { nullable: true })
  dribbble?: string | null;

  @Field(() => String, { nullable: true })
  behance?: string | null;

  @Field(() => String, { nullable: true })
  pinterest?: string | null;

  @Field(() => String, { nullable: true })
  soundcloud?: string | null;

  @Field(() => String, { nullable: true })
  spotify?: string | null;

  @Field(() => String, { nullable: true })
  medium?: string | null;

  @Field(() => String, { nullable: true })
  vimeo?: string | null;

  @Field(() => String, { nullable: true })
  youtube?: string | null;

  @Field(() => String, { nullable: true })
  github?: string | null;

  @Field(() => String, { nullable: true })
  discord?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
