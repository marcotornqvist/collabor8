import { useEffect, useRef, useState } from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import {
  ContactChatsQuery,
  ContactChatsQueryVariables,
  useContactChatsQuery,
} from "generated/graphql";
import ContactItem from "./ContactItem";
import SearchInput from "@/components-modules/global/SearchInput";

interface IProps {
  isMobile: boolean;
}

const limit = 15;

const Contacts = ({ isMobile }: IProps) => {
  const [disableMore, setDisableMore] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [search, setSearch] = useState("");

  const { data, fetchMore } = useContactChatsQuery({
    variables: {
      data: {
        first: limit,
        searchText: search,
      },
    },
  });

  const listRef = useRef(null);

  // Checks if scroll position is at bottom
  const onScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setIsAtBottom(scrollTop + clientHeight === scrollHeight);
    }
  };

  // If element after last grid item is visible, fetch more messages if conditions match
  useEffect(() => {
    if (
      !disableMore &&
      isAtBottom &&
      data?.contactChats &&
      data.contactChats.length >= limit
    ) {
      fetchMore<ContactChatsQuery, ContactChatsQueryVariables>({
        variables: {
          data: {
            after: data.contactChats[data.contactChats.length - 1].id,
            first: limit,
          },
        },
      }).then(({ data: { contactChats } }) => {
        // Sets disableMore to true if less than limit was in response
        if (contactChats && contactChats.length < limit) {
          setDisableMore(true);
        }
      });
    }
  }, [isAtBottom, data?.contactChats]);

  return (
    <div className="contacts">
      <motion.h4 initial="hidden" animate="visible" variants={fadeInVariants}>
        Contacts
      </motion.h4>
      <SearchInput search={search} setSearch={setSearch} />
      <ul ref={listRef} onScroll={onScroll}>
        {data?.contactChats?.map((item) => (
          <ContactItem
            key={item.id}
            id={item.id}
            selected={!isMobile && true}
            newMessages={item.newMessages}
            title={item.user.profile?.discipline?.title}
            country={item.user.profile?.country}
            firstName={item.user.profile?.firstName}
            lastName={item.user.profile?.lastName}
            profileImage={item.user.profile?.profileImage}
          />
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
