import { useState, ReactElement, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { register, registerVariables } from "generated/register";
import { authState } from "store";
import { REGISTER_USER } from "@/operations-mutations/register";
import { useRouter } from "next/router";
import { RegisterInput } from "generated/globalTypes";
import { Formik } from "formik";
import AuthLayout from "@/components-pages/auth/AuthLayout";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import * as Yup from "yup";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Form validation
const RegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string().max(
    255,
    "First name cannot be more than 255 characters"
  ),
  lastName: Yup.string().max(
    255,
    "Last name cannot be more than 255 characters"
  ),
  email: Yup.string()
    .email("Email is not valid")
    .required("Email cannot be empty"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords don't match"
  ),
});

const Register = () => {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<Errors>({});

  const [register, { client }] = useMutation<register, registerVariables>(
    REGISTER_USER,
    {
      onError: (error) => {
        setFormErrors(error.graphQLErrors[0].extensions?.errors);
      },
    }
  );

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

  console.log(formErrors);

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
            setFormErrors(errors);
            handleSubmit;
          }}
        >
          <div className="wrapper">
            <div className={`input-group ${input.group}`}>
              <div className="input-text">
                <label htmlFor="firstName">First Name</label>
                {formErrors.firstName && (
                  <span className="error-message">{formErrors.firstName}</span>
                )}
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={input.default}
                value={values.firstName}
                onChange={handleChange}
                placeholder="Please enter your first name"
                autoComplete="on"
              />
            </div>
            <div className={`input-group ${input.group}`}>
              <div className="input-text">
                <label htmlFor="lastName">Last Name</label>
                {formErrors.lastName && (
                  <span className="error-message">{formErrors.lastName}</span>
                )}
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={input.default}
                value={values.lastName}
                onChange={handleChange}
                placeholder="Please enter your last name"
                autoComplete="on"
              />
            </div>
          </div>
          <div className={`input-group ${input.group}`}>
            <div className="input-text">
              <label htmlFor="email">Email</label>
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
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
              {formErrors.password && (
                <span className="error-message">{formErrors.password}</span>
              )}
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
              {formErrors.confirmPassword && (
                <span className="error-message">
                  {formErrors.confirmPassword}
                </span>
              )}
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
