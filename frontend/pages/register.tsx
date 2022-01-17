import { useState, ReactElement, useEffect } from "react";
import AuthLayout from "@components-pages/auth/AuthLayout";
import { useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { authState } from "store";
import { REGISTER_USER } from "@operations-mutations/register";
import { useRouter } from "next/router";
import input from "@styles-modules/Input.module.scss";
import button from "@styles-modules/Button.module.scss";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [register, { loading, client }] = useMutation<
    register,
    registerVariables
  >(REGISTER_USER, {
    variables: {
      data: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      },
    },
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions?.errors);
      console.log(error);
    },
  });

  if (loading) return <div>Submitting...</div>;

  const redirect = router.query.redirect;

  const handleRegister = async () => {
    const { data } = await register();

    if (data) {
      authState.loading = true;
      authState.accessToken = data.register.accessToken;
      authState.isAuth = true;
      client!.resetStore();
      // If there is a single redirect query string, use it as the pathname
      router.push(typeof redirect === "string" ? redirect : "/my-profile");
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
        pathname: "/login",
        query: { redirect: redirect },
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setErrors({});
        handleRegister();
      }}
    >
      <div className="wrapper">
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <input
            className={input.default}
            value={firstName}
            placeholder="Your first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            autoComplete="on"
          />
        </div>
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <input
            className={input.default}
            value={lastName}
            placeholder="Your last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            autoComplete="on"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-text">
          <label htmlFor="email">Email</label>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
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
        <div className="input-text">
          <label htmlFor="password">Password</label>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <input
          className={input.default}
          type="password"
          value={password}
          placeholder="Enter a new password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <div className="input-group">
        <div className="input-text">
          <label htmlFor="confirmPassword">Confirm Password</label>
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        <input
          className={input.default}
          type="password"
          value={confirmPassword}
          placeholder="Confirm your new password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <button type="submit" className={button.green}>
        Create Account
      </button>
      <span className="account-exists">
        Already have an account?{" "}
        <a onClick={() => handleRouteChange()}>Sign In</a>
      </span>
    </form>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title={"Register"}>{page}</AuthLayout>;
};

export default Register;
