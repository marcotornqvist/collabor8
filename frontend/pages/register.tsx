import { useState, FC, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
// import { useRegisterMutation } from "../generated/graphql";

const REGISTER_USER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
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

const Register = () => {
  const [firstName, setFirstName] = useState("john");
  const [lastName, setLastName] = useState("doe");
  const [email, setEmail] = useState("johndoe2@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [errors, setErrors] = useState({});

  const [registerUser, { data, loading, error }] = useMutation<
    register,
    registerVariables
  >(REGISTER_USER, {
    variables: {
      data: {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      },
    },
  });

  if (loading) return "Submitting...";
  if (error?.graphQLErrors) return `Submission error! ${error.message}`;

  return (
    <div className="register">
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <div>
            <input
              value={firstName}
              placeholder="firstname"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              value={lastName}
              placeholder="lastname"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
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
          <div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
