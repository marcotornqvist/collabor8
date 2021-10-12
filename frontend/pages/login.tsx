import React, { useState, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";
import { authState } from "store";
import { LOGIN_USER } from "@operations-mutations/login";
import styles from "@styles-modules/Input.module.scss";
import { useSnapshot } from "valtio";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);

  useEffect(() => {
    // If authenticated redirect to projects
    if (isAuth) {
      router.push("/projects");
    }
  }, [isAuth]);

  const [login, { data, loading }] = useMutation<login, loginVariables>(
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

  if (loading) return "Submitting...";
  if (data) {
    authState.accessToken = data.login.accessToken;
    authState.isAuth = true;
    router.push("/projects");
  }

  return (
    <div className="login-page">
      <div className="container">
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
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
