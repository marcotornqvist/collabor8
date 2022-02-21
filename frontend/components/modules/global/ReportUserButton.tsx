import React from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Link from "next/link";

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
          <button className="danger-button">
            <a>
              <div className="inner-div">
                <span>Report User</span>
              </div>
            </a>
          </button>
        </Link>
      ) : (
        <Link href={`/report/user/${id}`}>
          <button className="danger-button">
            <a>
              <div className="inner-div">
                <span>Report User</span>
              </div>
            </a>
          </button>
        </Link>
      )}
    </>
  );
};

export default ReportUserButton;
