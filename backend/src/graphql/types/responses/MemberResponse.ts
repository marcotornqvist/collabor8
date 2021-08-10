import "reflect-metadata";
import { User } from "../../entities/User";
import { Member } from "../../entities/Member";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MemberResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => Member)
  member: Member;
}
