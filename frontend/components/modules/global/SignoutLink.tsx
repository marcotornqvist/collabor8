import { useMutation } from "@apollo/client";
import { authState } from "store";
import { LOGOUT_USER } from "@operations-mutations/logout";
import { useRouter } from "next/router";
import Image from "next/image";

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
    <a>
      <li onClick={() => clickHandler()}>
        <span>Sign Out</span>
        <Image
          src="/icons/sign-out-alt-solid.svg"
          alt="sign out"
          width={18}
          height={18}
        />
      </li>
    </a>
  );
};

export default SignoutLink;
