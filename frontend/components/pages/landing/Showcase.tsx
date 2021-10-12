import Link from "next/link";
import styles from "@styles-modules/Button.module.scss";
import Image from "next/image";
import { authState } from "store";
import { useSnapshot } from "valtio";

const Showcase = () => {
  const { isAuth } = useSnapshot(authState);
  return (
    <section className="showcase">
      <div className="container">
        <div className="hero-text">
          <h1 className="title">Find other people to collaborate with.</h1>
          <p className="sub-title">
            <span>Collabor8</span> is a social-media like platform created
            primarily for creators/artists that are looking to collaborate on
            different versatile projects.
          </p>
          <Link href={isAuth ? "/projects" : "/register"}>
            <a>
              <button className={styles.defaultButton}>Get Started</button>
            </a>
          </Link>
        </div>
      </div>
      <Image
        src="/images/stripes.svg"
        alt="stripes"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </section>
  );
};

export default Showcase;
