import Link from "next/link";
import button from "@styles-modules/Button.module.scss";
import Image from "next/image";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";

const Showcase = () => {
  const { isAuth } = useSnapshot(authState);

  return (
    <section className="showcase">
      <div className="container">
        <div className="hero-text">
          <motion.h1
            className="title"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                damping: 20,
                stiffness: 125,
                type: "spring",
              },
            }}
          >
            Find other people to collaborate with.
          </motion.h1>
          <motion.span
            className="sub-title"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.5,
              },
            }}
          >
            <span className="italic">Collabor8</span> is a social-media like
            platform created primarily for creators/artists that are looking to
            collaborate on different versatile projects.
          </motion.span>
          <Link href={isAuth ? "/projects" : "/register"}>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 0.5,
                },
              }}
            >
              <button className={button.white}>Get Started</button>
            </motion.a>
          </Link>
        </div>
      </div>
      <Image
        src="/images/stripes.svg"
        alt="stripes"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
    </section>
  );
};

export default Showcase;
