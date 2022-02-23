import { NextQueryParamProvider } from "next-query-params";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import Menu from "./menu/Menu";
import ProjectChatbox from "./chatbox/project/ProjectChatbox";
import ContactChatbox from "./chatbox/contact/ContactChatbox";

interface IProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: IProps) => {
  const { pathname } = useRouter();
  const { isMobile } = useIsMobile(920);
  console.log(isMobile);

  console.log(pathname);

  return (
    <NextQueryParamProvider>
      <section className={`chat-layout chat-page`}>
        <div className="container">
          {isMobile && pathname === "/chat" && <Menu />}
          {!isMobile && <Menu />}
          {isMobile && pathname === "/chat/project/[id]" && <ProjectChatbox />}
          {isMobile && pathname === "/chat/contact/[id]" && <ContactChatbox />}
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default ChatLayout;
