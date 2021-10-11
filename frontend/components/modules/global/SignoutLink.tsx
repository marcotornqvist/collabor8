import { useMutation } from "@apollo/client";
import { authState } from "store";
import { LOGOUT_USER } from "@operations-mutations/logout";
import { useRouter } from "next/router";

const SignoutLink = () => {
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT_USER);

  const clickHandler = async () => {
    try {
      await logout();
      authState.accessToken = "";
      authState.isAuth = false;
      await client!.resetStore();
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <li onClick={() => clickHandler()}>
      <a>Sign Out</a>
    </li>
  );
};

export default SignoutLink;
