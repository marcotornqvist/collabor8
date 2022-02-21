import React from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Link from "next/link";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  id: string;
}

const ReportUserButton = ({ id }: IProps) => {
  const { isAuth } = useSnapshot(authState);

  return (
    <>
      {!isAuth ? (
        <Link
          href={{
            pathname: "/login",
            query: { redirect: `/report/user/${id}` },
          }}
        >
          <a>
            <button className={`danger-button ${button.lightRed}`}>
              Report User
            </button>
          </a>
        </Link>
      ) : (
        <Link href={`/report/user/${id}`}>
          <a>
            <button className={`danger-button ${button.lightRed}`}>
              Report User
            </button>
          </a>
        </Link>
      )}
    </>
  );
};

export default ReportUserButton;
