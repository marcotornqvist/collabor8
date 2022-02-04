import { useState } from "react";
import { NextQueryParamProvider } from "next-query-params";
import ProfileList from "@/components-pages/profiles/ProfileList";
import Filters from "@/components-modules/filter/Filters";
import useWindowSize from "@/hooks/useWindowSize";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const Profiles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <NextQueryParamProvider>
      <section className="profiles-page">
        <div className="container">
          <Filters isMobile={isMobile} />
          <ProfileList />
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default Profiles;
