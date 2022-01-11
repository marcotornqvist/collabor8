import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";
import { authState } from "store";
import { LOGIN_USER } from "@operations-mutations/login";
import { useRouter } from "next/router";
import inputStyles from "@styles-modules/Input.module.scss";
import buttonStyles from "@styles-modules/Button.module.scss";
import Link from "next/link";
import styles from "@styles-modules/Input.module.scss";
import { useSnapshot } from "valtio";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";

interface Errors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const router = useRouter();
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
  }, [error]);

  if (loading) return <div>"Submitting..."</div>;
  if (data) {
    authState.accessToken = data.login.accessToken;
    authState.isAuth = true;
    client!.resetStore();
    router.push("/projects");
  }

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
      <button type="submit" className={buttonStyles.defaultButton}>
        Sign In
      </button>
      {/* <button type="submit">login</button> */}
      <span className="account-exists">
        Don't have an account?{" "}
        <Link href="/register">
          <a>Register here</a>
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
