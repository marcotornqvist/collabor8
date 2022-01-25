import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { UPDATE_EMAIL } from "@/operations-mutations/updateEmail";
import { updateEmail, updateEmailVariables } from "generated/updateEmail";
import {
  loggedInUser,
  loggedInUser_loggedInUser,
} from "generated/loggedInUser";
import { GET_LOGGED_IN_USER } from "@/operations-queries/getLoggedInUser";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  email?: string;
  loading: boolean;
}

const UpdateEmail = ({ email, loading }: IProps) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [updateEmail] = useMutation<updateEmail, updateEmailVariables>(
    UPDATE_EMAIL,
    {
      update(cache, { data }) {
        const user = cache.readQuery<loggedInUser>({
          query: GET_LOGGED_IN_USER,
        });

        if (data?.updateEmail && user) {
          const merge: loggedInUser_loggedInUser = {
            ...user.loggedInUser,
            email: data.updateEmail,
          };
          cache.writeQuery<loggedInUser>({
            query: GET_LOGGED_IN_USER,
            data: {
              loggedInUser: merge,
            },
          });
          setIsValid(true);
        }
      },
      onError: (error) => setError(error.message),
    }
  );

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
