import React, { useState, FC, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { authState } from "store";
import { REGISTER_USER } from "@operations-mutations/register";
import { useRouter } from "next/router";
import styles from "@styles-modules/Input.module.scss";

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

  if (loading) return <div>Submitting...</div>;
  if (data) {
    authState.accessToken = data.register.accessToken;
    authState.isAuth = true;
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
      <div className="input-group">
        <label htmlFor="firstName">First Name</label>
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
        <input
          className={styles.input}
          value={firstName}
          placeholder="firstname"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Last Name</label>
        {errors.lastName && <span>{errors.lastName}</span>}
        <input
          className={styles.input}
          value={lastName}
          placeholder="lastname"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        {errors.email && <span className="error-message">{errors.email}</span>}
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
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
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
      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
        <input
          className={styles.input}
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
  );
};

export default Form;
