import { useRef } from "react";
import Link from "next/link";
import ContactButton from "./ContactButtons";
import BlockUser from "./BlockUser";
import useOnScreen from "@hooks/useOnScreen";

interface IProps {
  id: string;
}

const Settings = ({ id }: IProps) => {
  const ref: any = useRef<HTMLDivElement>();
  const isVisible = useOnScreen(ref);

  return (
    <ul className="settings" ref={ref}>
      <ContactButton id={id} isVisible={isVisible} />
      <Link href={`/report/user/${id}`}>
        <a>
          <li>
            <div className="inner-div">
              <span>Report User</span>
            </div>
          </li>
        </a>
      </Link>
      <BlockUser id={id} isVisible={isVisible} />
    </ul>
  );
};

export default Settings;
