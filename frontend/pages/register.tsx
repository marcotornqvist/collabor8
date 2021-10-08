import React, { useState, FC, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { setAccessToken } from "utils/accessToken";

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

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const [firstName, setFirstName] = useState("john");
  const [lastName, setLastName] = useState("doe");
  const [email, setEmail] = useState("johndoe2@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [errors, setErrors] = useState<Errors>({});

  const [register, { data, loading }] = useMutation<
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
    onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
  });

  if (loading) return "Submitting...";
  if (data) setAccessToken(data.register.accessToken);
  console.log(errors);

  return (
    <div className="register-page">
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErrors({});
            register();
          }}
        >
          <div>
            {errors.firstName && <label>{errors.firstName}</label>}
            <input
              value={firstName}
              placeholder="firstname"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            {errors.lastName && <label>{errors.lastName}</label>}
            <input
              value={lastName}
              placeholder="lastname"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            {errors.email && <label>{errors.email}</label>}
            <input
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            {errors.password && <label>{errors.password}</label>}
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
            {errors.confirmPassword && <label>{errors.confirmPassword}</label>}
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
