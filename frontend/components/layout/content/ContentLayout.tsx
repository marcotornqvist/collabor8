import { NextQueryParamProvider } from "next-query-params";
import Filters from "./filter/Filters";
import useIsMobile from "@/hooks/useIsMobile";

interface IProps {
  children: React.ReactNode;
  className: String;
}

const ContentLayout = ({ children, className }: IProps) => {
  const { isMobile } = useIsMobile();

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
