import { useState, useEffect, ReactElement } from "react";
import { authState } from "store";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { LoginInput, useLoginMutation } from "generated/graphql";
import AuthLayout from "@/components-pages/auth/AuthLayout";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [login, { client }] = useLoginMutation({
    onError: (error) => setError(error.message),
  });

  useToast({
    error,
  });

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
          <InputField
            name="email"
            value={values.email}
            handleChange={handleChange}
            label="Email"
            type="text"
            placeholder="Please enter your email address"
          />
          <InputField
            name="password"
            value={values.password}
            handleChange={handleChange}
            label="Password"
            type="password"
            placeholder="Please enter your password"
          />
          <span className="message">
            Incase you want to try the application as a signed in user without having to
            register a new account, use this account:
            "sebastiandoe@gmail.com", "sebastian123"
          </span>
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
