import { NextQueryParamProvider } from "next-query-params";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import Menu from "./menu/Menu";
import Chatbox from "./chatbox/Chatbox";

interface IProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: IProps) => {
  const { pathname } = useRouter();
  const { isMobile } = useIsMobile(920);
  console.log(isMobile);

  return (
    <NextQueryParamProvider>
      <section className={`chat-layout chat-page`}>
        <div className="container">
          {isMobile && pathname === "/chat" && <Menu />}
          {isMobile && pathname === "/chat/[chatroom]" && <Chatbox />}
          {!isMobile && (
            <>
              <Menu />
              <Chatbox />
            </>
          )}
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default ChatLayout;
