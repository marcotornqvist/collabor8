import { useState, ReactElement, useEffect } from "react";
import { authState, toastState } from "store";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { RegisterInput, useRegisterMutation } from "generated/graphql";
import { RegisterValidationSchema } from "@/validations/schemas";
import { ErrorStatus } from "@/types-enums/enums";
import { isNotEmptyObject } from "utils/helpers";
import AuthLayout from "@/components-pages/auth/AuthLayout";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import InputErrorMessage from "@/components-modules/global/InputErrorMessage";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [register, { client }] = useRegisterMutation({
    onError: (error) => {
      setIsSubmitted(true);
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

  useEffect(() => {
    if (error && !formErrors) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

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
            <div className={`input-group ${input.group}`}>
              <div className="input-text">
                <label htmlFor="firstName">First Name</label>
                <InputErrorMessage
                  errorMessage={formErrors.firstName}
                  successMessage={"First name is valid"}
                  isSubmitted={isSubmitted}
                />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={input.default}
                value={values.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                autoComplete="on"
              />
            </div>
            <div className={`input-group ${input.group}`}>
              <div className="input-text">
                <label htmlFor="lastName">Last Name</label>
                <InputErrorMessage
                  errorMessage={formErrors.lastName}
                  successMessage={"Last name is valid"}
                  isSubmitted={isSubmitted}
                />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={input.default}
                value={values.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                autoComplete="on"
              />
            </div>
          </div>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="email">Email</label>
              <InputErrorMessage
                errorMessage={formErrors.email}
                successMessage={"Email is valid"}
                isSubmitted={isSubmitted}
              />
            </div>
            <input
              id="email"
              name="email"
              type="text"
              className={input.default}
              value={values.email}
              onChange={handleChange}
              placeholder="Please enter your email address"
              autoComplete="on"
            />
          </div>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="password">Password</label>
              <InputErrorMessage
                errorMessage={formErrors.password}
                successMessage={"Password is valid"}
                isSubmitted={isSubmitted}
              />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className={input.default}
              value={values.password}
              onChange={handleChange}
              placeholder="Please enter a new password"
              autoComplete="on"
            />
          </div>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <InputErrorMessage
                errorMessage={formErrors.confirmPassword}
                successMessage={"Confirm Password is valid"}
                isSubmitted={isSubmitted}
              />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={input.default}
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              autoComplete="on"
            />
          </div>
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
