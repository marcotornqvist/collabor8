import { ReactElement, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { layoutState } from "store";
import { useSnapshot } from "valtio";
import { dropdownVariants } from "utils/variants";
import {
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  ProjectMessagesQuery,
  ProjectMessagesQueryVariables,
  useProjectMessagesQuery,
} from "generated/graphql";
import ChatLayout from "@/components-pages/chat/ChatLayout";
import ProjectHeader from "@/components-pages/chat/chatbox/project/ProjectHeader";
import Messages from "@/components-pages/chat/chatbox/Messages";
import useIsMobile from "@/hooks/useIsMobile";
import styles from "@/styles-modules/Chat.module.scss";
import Form from "@/components-pages/chat/chatbox/project/Form";

const limit = 20;

const Project = () => {
  const { push, query } = useRouter();
  const chatId = typeof query.chatId === "string" ? query.chatId : "";
  const { isMobile } = useIsMobile(920);
  const { slide } = useSnapshot(layoutState);
  const [initialRender] = useState(slide);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    layoutState.slide = true;
  }, []);

  const { data, loading, error, fetchMore, subscribeToMore } =
    useProjectMessagesQuery({
      variables: {
        data: {
          id: chatId,
          last: limit,
        },
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    setIsAtTop(false);
  }, [query]);

  // Redirect to /chat if error occurs (user is not authorized)
  useEffect(() => {
    if (error) {
      push("/chat");
    }
  }, [error]);

  // If element after last grid item is visible, fetch more messages if conditions match
  useEffect(() => {
    if (!loading && isAtTop && data?.projectMessages?.hasMore) {
      // console.log("Fetch more called");
      fetchMore<ProjectMessagesQuery, ProjectMessagesQueryVariables>({
        variables: {
          data: {
            id: chatId,
            before: data.projectMessages.messages[0].id,
            last: limit,
          },
        },
      });
    }
  }, [isAtTop]);

  // Subscribe to newMessages and update the messages cache
  useEffect(() => {
    let unsubscribe = subscribeToMore<
      NewMessageSubscription,
      NewMessageSubscriptionVariables
    >({
      document: NewMessageDocument,
      variables: {
        chatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;

        const newCache = Object.assign({}, prev, {
          projectMessages: {
            hasMore: prev.projectMessages?.hasMore,
            messages: [...(prev.projectMessages?.messages ?? []), newMessage],
          },
        });

        return newCache;
      },
    });
    return () => {
      unsubscribe();
    };
  }, [chatId, subscribeToMore]);

  return (
    <>
      {isMobile ? (
        <AnimatePresence
          initial={initialRender}
          onExitComplete={() => {
            push("/chat");
          }}
        >
          {slide && (
            <motion.div
              className={`chat ${styles.mobile}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants.slideIn}
            >
              <ProjectHeader chatId={chatId} />
              <div className="chatbox">
                <Messages
                  messages={data?.projectMessages?.messages}
                  dataLoading={loading}
                  chatId={chatId}
                  isAtTop={isAtTop}
                  setIsAtTop={setIsAtTop}
                />
                <Form chatId={chatId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className={`chat ${styles.desktop}`}>
          <ProjectHeader chatId={chatId} />
          <div className="chatbox">
            <Messages
              messages={data?.projectMessages?.messages}
              dataLoading={loading}
              chatId={chatId}
              isAtTop={isAtTop}
              setIsAtTop={setIsAtTop}
            />
            <Form chatId={chatId} />
          </div>
        </div>
      )}
    </>
  );
};

Project.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Project;
