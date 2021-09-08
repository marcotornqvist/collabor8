import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { ChatRoom } from "../../types/ChatRoom";
import { User } from "../../types/User";

@ObjectType()
export class ChatRoomResponse {
  @Field(() => [ChatRoom], { nullable: true })
  unreadChatRooms?: [ChatRoom] | null;

  @Field(() => [ChatRoom], { nullable: true })
  readChatRooms?: [ChatRoom] | null;
}

@ObjectType()
export class ContactResponse {
  @Field(() => [User], { nullable: true })
  usersWithNewMessages?: [User] | null;

  @Field(() => [User], { nullable: true })
  usersWithOldMessages?: [User] | null;
}
