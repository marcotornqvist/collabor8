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
          <a>
            <li className="danger-hover">
              <div className="inner-div">
                <span>Report User</span>
              </div>
            </li>
          </a>
        </Link>
      ) : (
        <Link href={`/report/user/${id}`}>
          <a>
            <li className="danger-hover">
              <div className="inner-div">
                <span>Report User</span>
              </div>
            </li>
          </a>
        </Link>
      )}
    </>
  );
};

export default ReportButton;
