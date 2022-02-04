import { useState } from "react";
import { NextQueryParamProvider } from "next-query-params";
import useWindowSize from "@/hooks/useWindowSize";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Filters from "./filter/Filters";

interface IProps {
  children: React.ReactNode;
  className: String;
}

const ContentLayout = ({ children, className }: IProps) => {
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
      <section className={`content-layout ${className}`}>
        <div className="container">
          <Filters isMobile={isMobile} />
          {children}
        </div>
      </section>
    </NextQueryParamProvider>
  );
};

export default ContentLayout;
