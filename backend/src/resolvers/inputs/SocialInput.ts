import { Field, InputType } from "type-graphql";

@InputType({ description: "Input Arguments for social links" })
export class SocialInput {
  @Field(() => String, { nullable: true })
  instagram?: string;

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
}
