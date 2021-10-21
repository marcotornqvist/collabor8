import { useEffect } from "react";
import Form from "@components-pages/register/Form";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";

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
      <div className="container">
        <aside>Find other creative people to collaborate with.</aside>
        <Form />
      </div>
    </div>
  );
};

export default Register;
