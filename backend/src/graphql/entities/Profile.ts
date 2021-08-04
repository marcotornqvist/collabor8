import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field((type) => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
