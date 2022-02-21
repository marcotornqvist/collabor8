import React from "react";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { authState } from "store";

interface IProps {
  id: string;
}

const ReportButton = ({ id }: IProps) => {
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
          <button className="danger-hover">
            <div className="inner-div">
              <a>Report User</a>
            </div>
          </button>
        </Link>
      ) : (
        <Link href={`/report/user/${id}`}>
          <button className="danger-hover">
            <div className="inner-div">
              <a>Report User</a>
            </div>
          </button>
        </Link>
      )}
    </>
  );
};

export default ReportButton;
