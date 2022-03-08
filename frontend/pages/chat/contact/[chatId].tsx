import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "utils/variants";
import { layoutState } from "store";
import { useSnapshot } from "valtio";
import { useContactMessagesQuery } from "generated/graphql";
import Form from "@/components-pages/chat/chatbox/contact/Form";
import ChatLayout from "@/components-pages/chat/ChatLayout";
import ContactHeader from "@/components-pages/chat/chatbox/contact/ContactHeader";
import styles from "@/styles-modules/Chat.module.scss";
import useIsMobile from "@/hooks/useIsMobile";
import Messages from "@/components-pages/chat/chatbox/Messages";

const Contact = () => {
  const { push, query } = useRouter();
  const chatId = typeof query.chatId === "string" ? query.chatId : "";
  const { slide } = useSnapshot(layoutState);
  const { isMobile } = useIsMobile(920);
  const [initialRender] = useState(slide);

  useEffect(() => {
    layoutState.slide = true;
  }, []);

  const { data } = useContactMessagesQuery({
    variables: {
      data: {
        id: chatId,
      },
    },
  });

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
                <Messages messages={data?.contactMessages} />
                <Form chatId={chatId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className={`chat ${styles.desktop}`}>
          <ContactHeader chatId={chatId} />
          <div className="chatbox">
            <Messages messages={data?.contactMessages} />
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
