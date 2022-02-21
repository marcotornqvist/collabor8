import { useEffect, useMemo, useState } from "react";
import { ProfileDetailsQuery } from "generated/graphql";
import SocialCard from "./SocialCard";
import useToast from "@/hooks/useToast";

type Socials = NonNullable<ProfileDetailsQuery["userByUsername"]>["socials"];

interface IProps {
  loading: boolean;
  socials: Socials;
}

const Socials = ({ loading, socials }: IProps) => {
  const [copied, setCopied] = useState<string | undefined>();
  const [hasValue, setHasValue] = useState(false);
  const [done, setDone] = useState(false);

  useToast({
    data: copied,
    successMessage: `${copied} copied to clipboard!`,
  });

  // Checks if there are any socials
  useEffect(() => {
    if (socials) {
      Object.entries(socials).forEach(([key, value]) => {
        if (key !== "userId" && key !== "__typename" && value) {
          setHasValue(true);
        }
      });
      setDone(true);
    }
  }, [socials]);

  return (
    <div className="socials">
      {!loading && !hasValue && done && (
        <div className="no-socials-found">
          <h3>We couldn&apos;t find any socials.</h3>
        </div>
      )}
      <div className="grid">
        {socials?.instagram && (
          <SocialCard
            name="Instagram"
            link={`https://instagram.com/${socials.instagram}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.linkedin && (
          <SocialCard
            name="LinkedIn"
            link={`https://linkedin.com/in/${socials.linkedin}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.dribbble && (
          <SocialCard
            name="Dribbble"
            link={`https://dribbble.com/${socials.dribbble}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.behance && (
          <SocialCard
            name="Behance"
            link={`https://www.behance.net/${socials.behance}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.pinterest && (
          <SocialCard
            name="Pinterest"
            link={`https://fi.pinterest.com/${socials.pinterest}/_saved/`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.soundcloud && (
          <SocialCard
            name="Soundcloud"
            link={`https://soundcloud.com/${socials.soundcloud}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.spotify && (
          <SocialCard
            name="Spotify"
            link={`https://open.spotify.com/user/${socials.spotify}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.medium && (
          <SocialCard
            name="Medium"
            link={`https://medium.com/${socials.medium}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.vimeo && (
          <SocialCard
            name="Vimeo"
            link={`https://vimeo.com/${socials.vimeo}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.youtube && (
          <SocialCard
            name="Youtube"
            link={`https://youtube.com/user/${socials.youtube}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.github && (
          <SocialCard
            name="Github"
            link={`https://github.com/${socials.youtube}`}
            copied={copied}
            setCopied={setCopied}
          />
        )}
        {socials?.discord && (
          <SocialCard
            name="Discord"
            link={socials.discord}
            copied={copied}
            setCopied={setCopied}
          />
        )}
      </div>
    </div>
  );
};

export default Socials;
