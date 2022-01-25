import { Field, InputType } from "type-graphql";

@InputType({ description: "Input Arguments for social links" })
export class SocialInput {
  [x: string]: any;
  @Field(() => String)
  instagram: string;

  @Field(() => String)
  linkedin: string;

  @Field(() => String)
  dribbble: string;

  @Field(() => String)
  behance: string;

  @Field(() => String)
  pinterest: string;

  @Field(() => String)
  soundcloud: string;

  @Field(() => String)
  spotify: string;

  @Field(() => String)
  medium: string;

  @Field(() => String)
  vimeo: string;

  @Field(() => String)
  youtube: string;

  @Field(() => String)
  github: string;

  @Field(() => String)
  discord: string;
}
