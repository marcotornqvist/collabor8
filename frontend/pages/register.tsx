import { useEffect, useState } from "react";
import Form from "@components-pages/register/Form";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const textVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      damping: 20,
      stiffness: 125,
      type: "spring",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);

  useEffect(() => {
    // If authenticated redirect to projects
    if (isAuth) {
      router.push("/projects");
    }
  }, [isAuth]);

  return (
    <div className="register-page">
      <aside>
        <motion.div
          className="image-container"
          animate={loaded ? "visible" : "hidden"}
          variants={imageVariants}
        >
          {loaded && (
            <div className="container">
              <motion.h1
                className="hero-text"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Find other creative people to collaborate with.
              </motion.h1>
            </div>
          )}
          <Image
            onLoadingComplete={(e) => {
              setLoaded(true);
            }}
            src="https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more.jpg"
            alt="more"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </motion.div>
      </aside>
      <div className="content">
        <div className="container">
          <div className="text-info">
            <Link href="/">
              <a className="brand">
                <h3>Collabor8</h3>
              </a>
            </Link>
            <h3 className="title">Register</h3>
          </div>
          <hr />
          <Form />
        </div>
      </div>
      <div className="footer-bottom-content">
        <span>Collabor8 © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Register;
