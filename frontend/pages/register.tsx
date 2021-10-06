import React, { useState, FC, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [registerUser, { loading }] = useMutation<register, registerVariables>(
    REGISTER_USER,
    {
      variables: {
        data: formData,
      },
      onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
    }
  );

  if (loading) return "Submitting...";

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
            {errors.firstName && <label>{errors.firstName}</label>}
            <input
              value={formData.firstName}
              name="firstName"
              placeholder="firstname"
              onChange={onChange}
            />
          </div>
          <div>
            {errors.lastName && <label>{errors.lastName}</label>}
            <input
              value={formData.lastName}
              name="lastName"
              placeholder="lastname"
              onChange={onChange}
            />
          </div>
          <div>
            {errors.email && <label>{errors.email}</label>}
            <input
              value={formData.email}
              name="email"
              placeholder="email"
              onChange={onChange}
            />
          </div>
          <div>
            {errors.password && <label>{errors.password}</label>}
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="password"
              onChange={onChange}
            />
          </div>
          <div>
            {errors.confirmPassword && <label>{errors.confirmPassword}</label>}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="confirm password"
              onChange={onChange}
            />
          </div>
          <button type="submit">register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
