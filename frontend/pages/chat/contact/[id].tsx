import { ReactElement } from "react";
import ChatLayout from "@/components-pages/chat/ChatLayout";

const Contact = () => {
  return <div>Contact</div>;
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Contact;
