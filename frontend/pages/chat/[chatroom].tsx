import React from "react";
import { useRouter } from "next/router";
import { gql, useSubscription } from "@apollo/client";

const NEW_MESSAGE = gql`
  subscription ($chatId: String!) {
    newMessage(chatId: $chatId) {
      body
    }
  }
`;

const Chatroom = () => {
  const router = useRouter();

  // console.log(router);

  const { data, loading } = useSubscription(NEW_MESSAGE, {
    variables: {},
  });

  return <div className="chatroom-page">{router.asPath}</div>;
};

export default Chatroom;
