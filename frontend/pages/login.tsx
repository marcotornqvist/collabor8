import React, { useState, FC, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "generated/login";

const LOGIN_USER = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      user {
        username
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;

// Check the next js guide to solve cookies problem

const Login = () => {
  const [email, setEmail] = useState("tarjahalonen@gmail.com");
  const [password, setPassword] = useState("tarjahalonen@gmail.com");
  const [error, setError] = useState("");

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
  console.log(data);

  return (
    <div className="login">
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
