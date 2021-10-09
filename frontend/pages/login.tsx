import React, { useState, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";
import { state } from "store";
import { LOGIN_USER } from "@operations-mutations/login";

const Login = () => {
  const [email, setEmail] = useState("tarjahalonen@gmail.com");
  const [password, setPassword] = useState("tarjahalonen@gmail.com");
  const [error, setError] = useState("");
  const router = useRouter();

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
    state.accessToken = data.login.accessToken;
    state.isAuth = true;
    router.push("/");
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
          <div>
            <input
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
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
