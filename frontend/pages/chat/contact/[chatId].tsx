import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "utils/variants";
import { layoutState } from "store";
import { useSnapshot } from "valtio";
import {
  ContactMessagesQuery,
  ContactMessagesQueryVariables,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  useContactMessagesQuery,
} from "generated/graphql";
import Form from "@/components-pages/chat/chatbox/contact/Form";
import ChatLayout from "@/components-pages/chat/ChatLayout";
import ContactHeader from "@/components-pages/chat/chatbox/contact/ContactHeader";
import styles from "@/styles-modules/Chat.module.scss";
import useIsMobile from "@/hooks/useIsMobile";
import Messages from "@/components-pages/chat/chatbox/Messages";

const limit = 20;

const Contact = () => {
  const { push, query } = useRouter();
  const chatId = typeof query.chatId === "string" ? query.chatId : "";
  const { isMobile } = useIsMobile(920);
  const { slide } = useSnapshot(layoutState);
  const [initialRender] = useState(slide);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    layoutState.slide = true;
  }, []);

  const { data, loading, error, fetchMore, subscribeToMore, client } =
    useContactMessagesQuery({
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

  // Remove contact messages from cache when [chatId] page is left
  // useEffect(() => {
  //   // client.cache.evict({ id: "ROOT_QUERY", fieldName: "contactMessages" });
  //   setIsAtTop(false);
  // }, [query]);

  // Redirect to /chat if user is not authorized to read chat
  useEffect(() => {
    if (error) {
      push("/chat");
    }
  }, [error]);

  // If element after last grid item is visible, fetch more messages if conditions match
  useEffect(() => {
    if (!loading && isAtTop && data?.contactMessages?.hasMore) {
      console.log("Fetch more called");
      fetchMore<ContactMessagesQuery, ContactMessagesQueryVariables>({
        variables: {
          data: {
            id: chatId,
            before: data.contactMessages.messages[0].id,
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
          contactMessages: {
            hasMore: prev.contactMessages?.hasMore,
            messages: [...(prev.contactMessages?.messages ?? []), newMessage],
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
              <ContactHeader chatId={chatId} />
              <div className="chatbox">
                <Messages
                  messages={data?.contactMessages?.messages}
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
          <ContactHeader chatId={chatId} />
          <div className="chatbox">
            <Messages
              messages={data?.contactMessages?.messages}
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

Contact.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Contact;
