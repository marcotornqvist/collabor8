import { useEffect, useState } from "react";
import { NextQueryParamProvider } from "next-query-params";
import { useRouter } from "next/router";
import { layoutState } from "store";
import { useSnapshot } from "valtio";
import useIsMobile from "@/hooks/useIsMobile";
import Menu from "./menu/Menu";

interface IProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: IProps) => {
  let {
    pathname,
    query: { id },
  } = useRouter();
  id = typeof id === "string" ? id : "";
  const { isMobile } = useIsMobile(920);

  useEffect(() => {
    // Prevent body scroll
    if (
      (pathname === "/chat/project/[chatId]" ||
        pathname === "/chat/contact/[chatId]") &&
      isMobile
    ) {
      document.body.classList.add("body-prevent-scroll");
    } else {
      document.body.classList.remove("body-prevent-scroll");
    }
  }, [isMobile, pathname]);

  return (
    <NextQueryParamProvider>
      <section className={`chat-layout chat-page`}>
        <div className="container">
          <Menu id={id} isMobile={isMobile} />
          {children}
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default ChatLayout;
