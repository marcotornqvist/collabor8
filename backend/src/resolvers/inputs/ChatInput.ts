import { ArgsType, Field, InputType } from "type-graphql";
import { PaginationArgs } from "./GlobalInputs";

@InputType({
  description: "Chat Inputs and Pagination",
})
export class ChatInput extends PaginationArgs {
  @Field(() => String)
  id: string;
}

@InputType({
  description: "Create Message",
})
export class CreateMessageInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;
}

@ArgsType()
export class newMessageArgs {
  @Field(() => String)
  chatId: string;
}
