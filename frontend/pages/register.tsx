import { useEffect } from "react";
import Form from "@components-pages/register/Form";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
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
        <div className="container">
          <h1 className="hero-title">
            Find other creative people to collaborate with.
          </h1>
        </div>
        <Image
          src="https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more.jpg"
          alt="more"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          quality={100}
        />
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
