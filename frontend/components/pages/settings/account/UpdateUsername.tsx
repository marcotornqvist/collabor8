import { useRef, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { UPDATE_USERNAME } from "@/operations-mutations/updateUsername";
import {
  updateUsername,
  updateUsernameVariables,
} from "generated/updateUsername";
import { loggedInUser } from "generated/loggedInUser";
import { GET_LOGGED_IN_USER } from "@/operations-queries/getLoggedInUser";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  currentUsername?: string;
  loading: boolean;
}

const UpdateUsername = ({ currentUsername, loading }: IProps) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [updateUsername] = useMutation<updateUsername, updateUsernameVariables>(
    UPDATE_USERNAME,
    {
      update(cache, { data }) {
        const user = cache.readQuery<loggedInUser>({
          query: GET_LOGGED_IN_USER,
        });

        if (data?.updateUsername && user) {
          const merge = {
            ...user.loggedInUser,
            username: data.updateUsername,
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

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

  return (
    <div className="update-username">
      {!loading && (
        <Formik
          enableReinitialize
          initialValues={{ username: currentUsername || "" }}
          onSubmit={async (values) => {
            setIsValid(false);
            setError("");
            if (values.username && values.username !== currentUsername) {
              await updateUsername({
                variables: {
                  username: values.username,
                },
              });
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="username">Username</label>
                  {error && (
                    <span className="error-message">Username is not valid</span>
                  )}
                  {isValid && (
                    <span className="success-message">Username is valid</span>
                  )}
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={values.username.toLowerCase()}
                  onChange={handleChange}
                  placeholder={"Write a username"}
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
                {isSubmitting ? "Submitting..." : "Save Username"}
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateUsername;
