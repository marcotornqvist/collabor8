import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useContactAddMessageMutation,
  useContactMessagesQuery,
  useNewMessageSubscription,
} from "generated/graphql";
import input from "@/styles-modules/Input.module.scss";
import Form from "./Form";
import ContactHeader from "./ContactHeader";
import { AnimatePresence } from "framer-motion";
import { dropdownVariants, fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import styles from "@/styles-modules/Chatbox.module.scss";

interface IProps {
  chatId: string;
  isMobile: boolean;
  isVisible: boolean;
}

const ContactChatbox = ({ chatId, isMobile, isVisible }: IProps) => {
  // const {
  //   query: { chatId },
  // } = useRouter();
  // Use below in future to request messages and subscribe
  // https://www.apollographql.com/docs/react/data/subscriptions/
  // const { subscribeToMore, ...result } = useQuery(CONTACT_MESSAGES, {
  //   variables: {
  //     chatId: chatroomId,
  //   },
  // });

  // const { data, loading } = useNewMessageSubscription({
  //   variables: {
  //     chatId,
  //   },
  // });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const { data } = useContactMessagesQuery({
  //   variables: {
  //     data: {
  //       id: "",
  //     },
  //   },
  // });

  return (
    <>
      {isMobile ? (
        <AnimatePresence>
          {isVisible && (
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
        <>
          {isVisible && (
            <div className="content content-desktop">
              <ContactHeader chatId={chatId} />
              <div className={`chatbox ${styles.chatbox}`}>
                <div className="messages"></div>
                <Form chatId={chatId} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ContactChatbox;
