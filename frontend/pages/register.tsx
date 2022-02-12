import { useState, ReactElement, useEffect } from "react";
import { authState } from "store";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { RegisterInput, useRegisterMutation } from "generated/graphql";
import { RegisterValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import AuthLayout from "@/components-pages/auth/AuthLayout";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const router = useRouter();
  const [lastSubmit, setLastSubmit] = useState<RegisterInput>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [register, { client, loading }] = useRegisterMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
  });

  const redirect = router.query.redirect;

  const handleRegister = async (values: RegisterInput) => {
    const { data } = await register({
      variables: {
        data: values,
      },
    });

    !loading && setLastSubmit(values);

    if (data) {
      authState.loading = true;
      authState.accessToken = data.register.accessToken;
      authState.isAuth = true;
      client!.resetStore();
      // If there is a single redirect query string, use it as the pathname
      router.push(
        typeof redirect === "string" ? redirect : "/settings/profile"
      );
      router.events.on(
        "routeChangeComplete",
        () => (authState.loading = false)
      );
    }
  };

  // Pass the route query to register route
  const handleRouteChange = () => {
    if (typeof redirect === "string") {
      router.push({
        pathname: "/login",
        query: { redirect: redirect },
      });
    } else {
      router.push("/login");
    }
  };

  useToast({
    error,
  });

  return (
    <Formik
      validationSchema={RegisterValidationSchema}
      validateOnMount={true}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => handleRegister(values)}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isNotEmptyObject(errors) && setFormErrors(errors);
            handleSubmit();
          }}
        >
          <div className="wrapper">
            <InputField
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              label="First name"
              type="text"
              placeholder="Enter your first name"
              successMessage="First name is valid"
              errorMessage={formErrors.firstName}
              lastSubmitValue={lastSubmit?.firstName}
            />
            <InputField
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
              label="Last name"
              type="text"
              placeholder="Enter your last name"
              successMessage="Last name is valid"
              errorMessage={formErrors.lastName}
              lastSubmitValue={lastSubmit?.lastName}
            />
          </div>
          <InputField
            name="email"
            value={values.email}
            handleChange={handleChange}
            label="Email"
            type="text"
            placeholder={"Please enter your email address"}
            successMessage="Email is valid"
            errorMessage={formErrors.email}
            lastSubmitValue={lastSubmit?.email}
          />
          <InputField
            name="password"
            value={values.password}
            handleChange={handleChange}
            label="Password"
            type="password"
            placeholder="Please enter a new password"
            successMessage="Password is valid"
            errorMessage={formErrors.password}
            lastSubmitValue={lastSubmit?.password}
          />
          <InputField
            name="confirmPassword"
            value={values.confirmPassword}
            handleChange={handleChange}
            label="Confirm Password"
            type="password"
            placeholder="Please confirm password"
            successMessage="Confirm password is valid"
            errorMessage={formErrors.confirmPassword}
            lastSubmitValue={lastSubmit?.confirmPassword}
          />
          <button
            type="submit"
            className={`${
              isSubmitting ? button.green : button.lightGreen
            } submit-btn`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          <span className="account-exists">
            Already have an account?{" "}
            <a onClick={() => handleRouteChange()}>Sign In</a>
          </span>
        </form>
      )}
    </Formik>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title={"Register"}>{page}</AuthLayout>;
};

export default Register;
