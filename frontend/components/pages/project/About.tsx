import { useState } from "react";
import { truncateText } from "utils/helpers";

interface IProps {
  body?: string;
}

const About = ({ body }: IProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="about">
      <span className="sub-title">About</span>
      <p className="text">
        {!show && body && body.length > 300
          ? truncateText(body, 300, "")
          : body}
        <span onClick={() => setShow(!show)}>
          {" "}
          {!show ? "Show More" : "Show Less"}
        </span>
      </p>
    </div>
  );
};

export default About;
