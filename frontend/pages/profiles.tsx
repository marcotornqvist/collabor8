import React, { useEffect, useState } from "react";
import { NextQueryParamProvider } from "next-query-params";
import ProfileList from "@/components-pages/profiles/ProfileList";
import Filters from "@/components-modules/filter/Filters";
import useWindowSize from "@/hooks/useWindowSize";

const Profiles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setLoaded(true);
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <NextQueryParamProvider>
      <section className="profiles-page">
        {loaded && (
          <div className="container">
            <Filters isMobile={isMobile} />
            <ProfileList />
          </div>
        )}
      </section>
    </NextQueryParamProvider>
  );
};

export default Profiles;
