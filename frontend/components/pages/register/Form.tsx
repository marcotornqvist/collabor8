import React, { useState, FC, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { state } from "store";
import { REGISTER_USER } from "@operations-mutations/register";
import { useRouter } from "next/router";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Form = () => {
  const router = useRouter();
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

  if (loading) return <div>Submitting...</div>;
  if (data) {
    state.accessToken = data.register.accessToken;
    state.isAuth = true;
    router.push("/");
  }

  return (
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
  );
};

export default Form;
