import { useState, FC } from "react";
import { truncateText } from "utils/helpers";

interface IProps {
  body?: string;
}

const About: FC<IProps> = ({ body }) => {
  const [show, setShow] = useState(false);
  if (body) {
    return (
      <div className="about">
        <span className="sub-title">Description</span>
        <p className="text">
          {!show && body && body.length > 750
            ? truncateText(body, 750, "")
            : body}
          {body && body.length > 750 && (
            <span onClick={() => setShow(!show)}>
              {" "}
              {!show ? "Show More" : "Show Less"}
            </span>
          )}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default About;
