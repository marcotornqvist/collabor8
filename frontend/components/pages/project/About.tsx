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
        <span className="sub-title">About</span>
        <p className="text">
          {!show && body && body.length > 300
            ? truncateText(body, 300, "")
            : body}
          {body && body.length > 300 && (
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
