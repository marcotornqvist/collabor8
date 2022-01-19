import React from "react";
import Link from "next/link";

interface IProps {
  id: string;
  isAuth: boolean;
}

const ReportButton = ({ id, isAuth }: IProps) => {
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
