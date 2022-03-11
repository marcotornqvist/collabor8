import {
  ContactMessagesQuery,
  useLoggedInUsernameQuery,
} from "generated/graphql";
import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import useIsMobile from "@/hooks/useIsMobile";

type Message = NonNullable<
  ContactMessagesQuery["contactMessages"]
>["messages"][0];

interface IProps {
  messages?: Message[] | null;
  dataLoading: boolean;
  chatId: string;
  isAtTop: boolean;
  setIsAtTop: (isAtTop: boolean) => void;
}

const Messages = ({
  messages,
  dataLoading,
  chatId,
  isAtTop,
  setIsAtTop,
}: IProps) => {
  const { isMobile } = useIsMobile(480);
  const ref = useRef<HTMLDivElement>(null);

  // Gets logged in user id
  const { data, loading } = useLoggedInUsernameQuery({
    fetchPolicy: "cache-only",
  });

  // Scroll to bottom of list
  useEffect(() => {
    if (ref.current && !dataLoading && !isAtTop) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [ref.current, dataLoading, chatId, messages]);

  // Checks if scroll position is at top, if so fetch more messages
  const onScroll = () => {
    if (ref.current) {
      // Returns either true or false
      setIsAtTop(ref.current.scrollTop === 0);
    }
  };

  return (
    <div className="messages" ref={ref} onScroll={onScroll}>
      <div className="container">
        {!loading &&
          messages?.map((item) => (
            <MessageItem
              key={item.id}
              side={item.user?.id === data?.loggedInUser.id ? "right" : "left"}
              body={item.body}
              profileImage={item.user?.profile?.profileImage}
              firstName={item.user?.profile?.firstName}
              lastName={item.user?.profile?.lastName}
              isMobile={isMobile}
            />
          ))}
      </div>
    </div>
  );
};

export default Messages;
