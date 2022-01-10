import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { authState } from "store";
import { REGISTER_USER } from "@operations-mutations/register";
import { useRouter } from "next/router";
import inputStyles from "@styles-modules/Input.module.scss";
import buttonStyles from "@styles-modules/Button.module.scss";
import Link from "next/link";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Form = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [register, { data, loading, client }] = useMutation<
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
  if (data) {
    authState.accessToken = data.register.accessToken;
    authState.isAuth = true;
    client!.resetStore();
    router.push("/my-profile");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setErrors({});
        register();
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
            className={inputStyles.input}
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
            className={inputStyles.input}
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
          className={inputStyles.input}
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
          className={inputStyles.input}
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
          className={inputStyles.input}
          type="password"
          value={confirmPassword}
          placeholder="Confirm your new password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <button type="submit" className={buttonStyles.defaultButton}>
        Create Account
      </button>
      <span className="account-exists">
        Already have an account?{" "}
        <Link href="/login">
          <a>Sign In</a>
        </Link>
      </span>
    </form>
  );
};

export default Form;
