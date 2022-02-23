import { ReactElement } from "react";
import ChatLayout from "@/components-pages/chat/ChatLayout";

const Chatroom = () => {
  return <div>Chatroom</div>;
};

Chatroom.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Chatroom;
