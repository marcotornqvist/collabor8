import React from "react";
import { useContactByIdQuery } from "generated/graphql";
import ProfileImage from "@/components-modules/global/ProfileImage";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  chatId: string;
}

const ContactHeader = ({ chatId }: IProps) => {
  const { data, loading } = useContactByIdQuery({
    variables: {
      id: chatId,
    },
  });

  return (
    <div className="header contact-header">
      <div className="profile-details">
        <Link href={`/profile/${data?.contactById.username}`}>
          <a>
            <ProfileImage
              size="small"
              profileImage={data?.contactById.profile?.profileImage}
              firstName={data?.contactById.profile?.firstName}
              lastName={data?.contactById.profile?.lastName}
              priority={true}
            />
          </a>
        </Link>
        <div className="wrapper">
          <div className="inner-wrapper">
            <Link href={`/profile/${data?.contactById.username}`}>
              <a>
                <span className="name">
                  {data?.contactById.profile?.firstName}{" "}
                  {data?.contactById.profile?.lastName}
                </span>
              </a>
            </Link>
          </div>
          <span className="info-text">
            {data?.contactById.profile?.discipline?.title}
            {data?.contactById.profile?.discipline?.title &&
              data?.contactById.profile?.country &&
              ", "}
            {data?.contactById.profile?.country}
          </span>
        </div>
      </div>
      <Link href="/chat">
        <a>
          <div className="go-back-btn">
            <Image
              src="/icons/chevron-solid-left-white.svg"
              alt={"Chevron"}
              width={18}
              height={18}
              layout="fixed"
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ContactHeader;
