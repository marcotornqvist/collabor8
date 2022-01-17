import { useState, useEffect, ReactElement } from "react";
import AuthLayout from "@components-pages/auth/AuthLayout";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";
import { authState } from "store";
import { LOGIN_USER } from "@operations-mutations/login";
import { useRouter } from "next/router";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import button from "@styles-modules/Button.module.scss";
import input from "@styles-modules/Input.module.scss";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { loading, client }] = useMutation<login, loginVariables>(
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

  if (loading) return <div>Submitting...</div>;
  const redirect = router.query.redirect;

  const handleLogin = async () => {
    const { data } = await login();

    if (data) {
      // Set loading to true to prevent redirect in AuthLayout.tsx component
      authState.loading = true;
      authState.accessToken = data.login.accessToken;
      authState.isAuth = true;
      client!.resetStore();
      // If there is a single redirect query string, use it as the pathname
      router.push(typeof redirect === "string" ? redirect : "/projects");
      // Set loading to false when route has changed, to enable redirect in AuthLayout.tsx component
      router.events.on(
        "routeChangeComplete",
        () => (authState.loading = false)
      );
    }
  };

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
        handleLogin();
      }}
    >
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          className={input.default}
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
          className={input.default}
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
