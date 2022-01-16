import { authState } from "store";
import { useSnapshot } from "valtio";
import Image from "next/image";
import Link from "next/link";
import button from "@styles-modules/Button.module.scss";

const About = () => {
  const { isAuth } = useSnapshot(authState);
  return (
    <section className="about">
      <div className="container">
        <div className="grid">
          <div className="grid-item item-1">
            <div className="image-container">
              <Image
                src="/images/high-five.svg"
                alt="High five illustration"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="grid-item item-2">
            <div className="content">
              <h1>Collabor8</h1>
              <h3>Find other creatives.</h3>
              <p>
                Whether you are looking to hop in on a project or perhaps you
                have a project of your own. Collabor8 will help you find
                whatever it is that you need.
              </p>
              <Link href={isAuth ? "/projects" : "/register"}>
                <a>
                  <button className={button.white}>
                    {isAuth ? "Browse Projects" : "Create Account"}
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
