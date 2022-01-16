import { useState, useEffect, ReactElement } from "react";
import AuthLayout from "@components-pages/auth/AuthLayout";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";
import { authState } from "store";
import { LOGIN_USER } from "@operations-mutations/login";
import { useRouter } from "next/router";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import { useSnapshot } from "valtio";
import button from "@styles-modules/Button.module.scss";
import styles from "@styles-modules/Input.module.scss";

const Login = () => {
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, loading, client }] = useMutation<login, loginVariables>(
    LOGIN_USER,
    {
      variables: {
        data: {
          email,
          password,
        },
      },
      onError: (error) => setError(error.message),
    }
  );

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
    return;
  }, [error]);

  const redirect = router.query.redirect;

  if (loading) return <div>Submitting...</div>;
  if (data) {
    authState.accessToken = data.login.accessToken;
    authState.isAuth = true;
    client!.resetStore();
    // If there is a single redirect query single, use it as the pathname
    router.push(typeof redirect === "string" ? redirect : "/projects");
  }

  // Pass the route query to register route
  const handleRouteChange = () => {
    if (typeof redirect === "string") {
      router.push({
        pathname: "/register",
        query: { redirect: redirect },
      });
    } else {
      router.push("/register");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        login();
      }}
    >
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          value={email}
          placeholder="Please enter your email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="Please enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <button type="submit" className={button.green}>
        Sign In
      </button>
      <span className="account-exists">
        Don&#8217;t have an account?{" "}
        <a onClick={() => handleRouteChange()}>Register here</a>
      </span>
    </form>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title={"Sign In"}>{page}</AuthLayout>;
};

export default Login;
