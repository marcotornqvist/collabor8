import { useState, useEffect, ReactElement } from "react";
import { authState } from "store";
import { useRouter } from "next/router";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { Formik } from "formik";
import { LoginInput, useLoginMutation } from "generated/graphql";
import AuthLayout from "@/components-pages/auth/AuthLayout";
import button from "@/styles-modules/Button.module.scss";
import input from "@/styles-modules/Input.module.scss";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [login, { client }] = useLoginMutation({
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

  const redirect = router.query.redirect;

  const handleLogin = async (values: LoginInput) => {
    const { data } = await login({
      variables: {
        data: values,
      },
    });

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
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="email">Email</label>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Please enter your email address"
              autoComplete="on"
            />
          </div>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className={input.default}
              value={values.password}
              onChange={handleChange}
              placeholder="Please enter your password"
              autoComplete="on"
            />
          </div>
          <button
            type="submit"
            className={`${
              isSubmitting ? button.green : button.lightGreen
            } submit-btn`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          <span className="account-exists">
            Don&#8217;t have an account?{" "}
            <a onClick={() => handleRouteChange()}>Register here</a>
          </span>
        </form>
      )}
    </Formik>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title={"Sign In"}>{page}</AuthLayout>;
};

export default Login;
