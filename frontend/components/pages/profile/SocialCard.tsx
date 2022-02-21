import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import styles from "@/styles-modules/SocialCard.module.scss";

interface IProps {
  name: string;
  link: string;
  copied?: string;
  setCopied: (copied: string) => void;
}

const SocialCard = ({ name, link, copied, setCopied }: IProps) => {
  return (
    <CopyToClipboard text={link} onCopy={() => setCopied(name)}>
      <div
        className={`social-card ${
          copied !== name ? styles.default : styles.selected
        }`}
      >
        <div className="wrapper">
          <h4>{name}</h4>
          <span>{link}</span>
        </div>
        {copied !== name ? (
          <Image
            src="/icons/clipboard-solid-black.svg"
            alt="Chevron"
            width={24}
            height={24}
            layout="fixed"
          />
        ) : (
          <Image
            src="/icons/clipboard-check-solid-green.svg"
            alt="Chevron"
            width={24}
            height={24}
            layout="fixed"
          />
        )}
      </div>
    </CopyToClipboard>
  );
};

export default SocialCard;
