import { useEffect } from "react";
import Form from "@components-pages/register/Form";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);
  const { width } = useWindowSize();

  useEffect(() => {
    // If authenticated redirect to projects
    if (isAuth) {
      router.push("/projects");
    }
  }, [isAuth]);

  return (
    <div className="register-page">
      <div className="container">
        {width >= 920 && (
          <aside>
            <h1>Find other creative people to collaborate with.</h1>
            {/* <Image
            src="https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more.jpg"
            alt="more"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          /> */}
          </aside>
        )}
        <div className="content">
          <div className="text-info">
            <Link href="/">
              <a className="title">
                <h3>Collabor8</h3>
              </a>
            </Link>
            <h2>Register</h2>
          </div>
          <hr />
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Register;
