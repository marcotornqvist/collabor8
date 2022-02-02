import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";
import { Project } from "./Project";
import { Image } from "./Image"

@ObjectType()
export class Discipline {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Image, { nullable: true })
  image?: Image | null;

  @Field(() => ID)
  imageId?: string | null;

  @Field(() => [Profile], { nullable: true })
  profiles?: Profile[] | null;

  @Field(() => [Project], { nullable: true })
  projects?: Project[] | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
