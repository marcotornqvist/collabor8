import React from "react";
import { NextQueryParamProvider } from "next-query-params";
import { useRouter } from "next/router";
import ProfileList from "@/components-pages/profiles/ProfileList";
import Filters from "@/components-modules/filter/Filters";

const Profiles = () => {

  return (
    <NextQueryParamProvider>
      <div className="profiles-page">
        <Filters />
        <ProfileList
          // first={3}
          // country={typeof country === "string" ? country : ""}
          // disciplines={[]}
        />
      </div>
    </NextQueryParamProvider>
  );
};

export default Profiles;
