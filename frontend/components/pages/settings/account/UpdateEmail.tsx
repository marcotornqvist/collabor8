import { useState } from "react";
import { Formik } from "formik";
import { GET_LOGGED_IN_USER } from "@/operations-queries/getLoggedInUser";
import { LoggedInUserQuery, useUpdateEmailMutation } from "generated/graphql";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import { number } from "yup";

interface IProps {
  email?: string;
  loading: boolean;
}

const UpdateEmail = ({ email, loading }: IProps) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [updateEmail] = useUpdateEmailMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: GET_LOGGED_IN_USER,
      });

      console.log(user);

      if (data?.updateEmail && user) {
        const merge = {
          ...user.loggedInUser,
          email: data.updateEmail,
        };
        cache.writeQuery<LoggedInUserQuery>({
          query: GET_LOGGED_IN_USER,
          data: {
            loggedInUser: merge,
          },
        });
        setIsValid(true);
      }
    },
    onError: (error) => setError(error.message),
  });

  return (
    <div className="update-email">
      {!loading && (
        <Formik
          enableReinitialize
          initialValues={{ email: email || "" }}
          onSubmit={async (values) => {
            setIsValid(false);
            setError("");
            if (values.email && values.email !== email) {
              await updateEmail({
                variables: {
                  email: values.email,
                },
              });
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="email">Email</label>
                  {error && (
                    <span className="error-message">Email is not valid</span>
                  )}
                  {isValid && (
                    <span className="success-message">Email is valid</span>
                  )}
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  placeholder={"Please enter your email address"}
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
                {isSubmitting ? "Submitting..." : "Save Email"}
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateEmail;
