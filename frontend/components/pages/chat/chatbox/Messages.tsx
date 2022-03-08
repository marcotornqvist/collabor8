import { ContactMessagesQuery } from "generated/graphql";
import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import useIsMobile from "@/hooks/useIsMobile";

type Message = NonNullable<ContactMessagesQuery["contactMessages"]>[0];

interface IProps {
  messages?: Message[] | null;
}

const Messages = ({ messages }: IProps) => {
  const { isMobile } = useIsMobile(480);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 100000);
    }
  }, []);

  return (
    <div className="messages" ref={ref}>
      <div className="container">
        <MessageItem
          side="left"
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse fuga in quia voluptas vitae doloribus facilis ratione nemo suscipit eveniet libero facere, reiciendis laboriosam impedit iure voluptatum commodi labore!"
          }
          profileImage={
            "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/6e2b31d6-89b2-4340-abee-ce0b8567246a.jpg"
          }
          firstName={"Marco"}
          lastName={"Törnqvist"}
          isMobile={isMobile}
        />
        <MessageItem
          side="right"
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse fuga in quia voluptas vitae doloribus facilis ratione nemo suscipit eveniet libero facere, reiciendis laboriosam impedit iure voluptatum commodi labore!"
          }
          profileImage={
            "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/6e2b31d6-89b2-4340-abee-ce0b8567246a.jpg"
          }
          firstName={"Marco"}
          lastName={"Törnqvist"}
          isMobile={isMobile}
        />
        <MessageItem
          side="left"
          body={"Lorem"}
          profileImage={
            "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/6e2b31d6-89b2-4340-abee-ce0b8567246a.jpg"
          }
          firstName={"Marco"}
          lastName={"Törnqvist"}
          isMobile={isMobile}
        />
        <MessageItem
          side="right"
          body={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse fuga in quia voluptas vitae doloribus facilis ratione nemo suscipit eveniet libero facere, reiciendis laboriosam impedit iure voluptatum commodi labore!"
          }
          profileImage={
            "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/6e2b31d6-89b2-4340-abee-ce0b8567246a.jpg"
          }
          firstName={"Marco"}
          lastName={"Törnqvist"}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default Messages;
