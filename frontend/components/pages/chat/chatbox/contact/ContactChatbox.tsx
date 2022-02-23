import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useContactAddMessageMutation,
  useNewMessageSubscription,
} from "generated/graphql";
import input from "@/styles-modules/Input.module.scss";

const ContactChatbox = () => {
  const {
    query: { id },
  } = useRouter();
  const chatId = typeof id === "string" ? id : "";

  // Use below in future to request messages and subscribe
  // https://www.apollographql.com/docs/react/data/subscriptions/
  // const { subscribeToMore, ...result } = useQuery(CONTACT_MESSAGES, {
  //   variables: {
  //     chatId: chatroomId,
  //   },
  // });

  const { data, loading } = useNewMessageSubscription({
    variables: {
      chatId,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [message, setMessage] = useState("");

  const [contactAddMessage] = useContactAddMessageMutation({
    variables: {
      data: {
        id: chatId,
        body: message,
      },
    },
  });

  return (
    <div className="chatbox">
      {loading && "loading"}
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        id="message"
        name="message"
        type="text"
        className={input.default}
        placeholder={!loading ? "Your first name" : ""}
        autoComplete="on"
      />
      <button
        onClick={() => {
          setMessage("");
          contactAddMessage();
        }}
      >
        Add Message
      </button>
    </div>
  );
};

export default ContactChatbox;
