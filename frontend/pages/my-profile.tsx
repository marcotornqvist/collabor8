import { useState, useEffect, useRef, FC } from "react";
import { useLazyQuery } from "@apollo/client";
import { authState } from "store";
import { GET_LOGGED_IN_USER } from "@operations-queries/getLoggedInUser";
import { loggedInUser } from "generated/loggedInUser";
import { useSnapshot } from "valtio";

const MyProfile: FC = () => {
  
  return (
    <div className="my-profile-page">
      <div className="container"></div>
    </div>
  );
};

export default MyProfile;
