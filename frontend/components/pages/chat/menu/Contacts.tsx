import { useState } from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { useContactChatsQuery } from "generated/graphql";
import ContactItem from "./ContactItem";
import SearchInput from "@/components-modules/global/SearchInput";

interface IProps {
  isMobile: boolean;
}

const Contacts = ({ isMobile }: IProps) => {
  const [search, setSearch] = useState("");

  const { data } = useContactChatsQuery({
    variables: {
      data: {
        first: 20,
        searchText: search,
      },
    },
  });

  return (
    <div className="contacts">
      <motion.h4
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        Contacts
      </motion.h4>
      <SearchInput search={search} setSearch={setSearch} />
      <ul>
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
