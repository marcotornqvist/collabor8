import React from "react";
import { gql } from "@apollo/client";
import Form from "@components-pages/register/Form";

const Register = () => {
  return (
    <div className="register-page">
      <div className="container">
        <Form />
      </div>
    </div>
  );
};

export default Register;
