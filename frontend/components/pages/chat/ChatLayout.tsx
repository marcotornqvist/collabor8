import { NextQueryParamProvider } from "next-query-params";
import { useRouter } from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import Menu from "./menu/Menu";
import ProjectChatbox from "./chatbox/project/ProjectChatbox";
import ContactChatbox from "./chatbox/contact/ContactChatbox";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: IProps) => {
  let {
    query: { id },
  } = useRouter();
  let router = useRouter();
  id = typeof id === "string" ? id : "";
  const { isMobile } = useIsMobile(920);
  const { pathname } = useRouter();
  const [slide, setSlide] = useState(false);

  console.log();

  useEffect(() => {
    const handleRouteChange = () => {
      setSlide(true);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // Prevent body scroll
    if (
      (pathname === "/chat/project/[id]" ||
        pathname === "/chat/contact/[id]") &&
      isMobile
    ) {
      document.body.classList.add("body-prevent-scroll");
    } else {
      document.body.classList.remove("body-prevent-scroll");
    }

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isMobile, pathname]);

  return (
    <NextQueryParamProvider>
      <section className={`chat-layout chat-page`}>
        <div className="container">
          <Menu id={id} isMobile={isMobile} />
          {isMobile && pathname === "/chat/project/[id]" && <ProjectChatbox />}
          <ContactChatbox
            chatId={id}
            isMobile={isMobile}
            isVisible={isMobile && pathname === "/chat/contact/[id]"}
            slide={slide}
          />
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default ChatLayout;
