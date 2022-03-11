import { useEffect, useRef, useState } from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import {
  ContactChatsQuery,
  ContactChatsQueryVariables,
  useContactChatsLazyQuery,
} from "generated/graphql";
import ContactItem from "./ContactItem";
import SearchInput from "@/components-modules/global/SearchInput";

interface IProps {
  chatId: string;
  isMobile: boolean;
}

const limit = 15;

const Contacts = ({ chatId, isMobile }: IProps) => {
  const [disableMore, setDisableMore] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [search, setSearch] = useState("");

  const [getContacts, { data, loading, client, fetchMore }] =
    useContactChatsLazyQuery({
      variables: {
        data: {
          first: limit,
          searchText: search,
        },
      },
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  // If search value is changed remove contactChats from cache
  // Get contacts with new search argument
  useEffect(() => {
    client.cache.evict({ id: "ROOT_QUERY", fieldName: "contactChats" });
    if (!loading) {
      getContacts();
      setDisableMore(false);
    }
  }, [search]);

  const listRef = useRef<null | HTMLUListElement>(null);

  // Checks if scroll position is at bottom
  const onScroll = () => {
    if (listRef.current) {
      const position = listRef.current.scrollTop + listRef.current.clientHeight;
      setIsAtBottom(position === listRef.current.scrollHeight);
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
      console.log("Fetch more called");
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
            selected={!isMobile && item.id === chatId}
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
