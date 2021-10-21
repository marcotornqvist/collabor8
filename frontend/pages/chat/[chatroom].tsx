import React from "react";
import { useRouter } from "next/router";

const Chatroom = () => {
  const router = useRouter();

  return <div className="chatroom-page">{router.asPath}</div>;
};

export default Chatroom;
