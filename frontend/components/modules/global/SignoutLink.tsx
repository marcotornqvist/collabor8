import { useMutation } from "@apollo/client";
import { authState } from "store";
import { LOGOUT_USER } from "@/operations-mutations/logout";
import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  size: number;
}

const SignoutLink = ({ size }: IProps) => {
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT_USER);

  const clickHandler = async () => {
    try {
      await logout();
      authState.accessToken = "";
      authState.isAuth = false;
      await client!.resetStore();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li onClick={() => clickHandler()}>
      <a>
        <span>Sign Out</span>
        <Image
          src="/icons/sign-out-alt-solid.svg"
          alt="sign out"
          width={size}
          height={size}
          layout="fixed"
        />
      </a>
    </li>
  );
};

export default SignoutLink;
