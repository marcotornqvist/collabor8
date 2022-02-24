import { ReactElement } from "react";
import ChatLayout from "@/components-pages/chat/ChatLayout";

const Chat = () => {
  return <></>;
};

Chat.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Chat;
