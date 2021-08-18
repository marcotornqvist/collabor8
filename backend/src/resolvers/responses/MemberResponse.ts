import "reflect-metadata";
import { User } from "../../types/User";
import { Member } from "../../types/Member";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MemberResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => Member)
  member: Member;
}
