import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants } from "utils/variants";
import { layoutState } from "store";
import { useSnapshot } from "valtio";
import Form from "@/components-pages/chat/chatbox/contact/Form";
import ChatLayout from "@/components-pages/chat/ChatLayout";
import ContactHeader from "@/components-pages/chat/chatbox/contact/ContactHeader";
import styles from "@/styles-modules/Chatbox.module.scss";
import useIsMobile from "@/hooks/useIsMobile";

const Contact = () => {
  const { push, query } = useRouter();
  const chatId = typeof query.chatId === "string" ? query.chatId : "";
  const { slide } = useSnapshot(layoutState);
  const { isMobile } = useIsMobile(920);
  const [initialRender] = useState(slide);

  useEffect(() => {
    layoutState.slide = true;
  }, []);

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
              className="content content-mobile"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants.slideIn}
            >
              <ContactHeader chatId={chatId} />
              <div className={`chatbox ${styles.chatbox}`}>
                <div className="messages"></div>
                <Form chatId={chatId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="content content-desktop">
          <ContactHeader chatId={chatId} />
          <div className={`chatbox ${styles.chatbox}`}>
            <div className="messages"></div>
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
