import { useEffect, useState } from "react";
import { Formik } from "formik";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  useUpdateUsernameMutation,
} from "generated/graphql";
import { UsernameValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import InputErrorMessage from "@/components-modules/global/InputErrorMessage";

interface IProps {
  currentUsername?: string;
  loading: boolean;
}

interface FormErrors {
  username?: string;
}

const UpdateUsername = ({ currentUsername, loading }: IProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updateUsername, { data }] = useUpdateUsernameMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.updateUsername && user) {
        const merge = {
          ...user.loggedInUser,
          username: data.updateUsername,
        };
        cache.writeQuery<LoggedInUserQuery>({
          query: LoggedInUserDocument,
          data: {
            loggedInUser: merge,
          },
        });
      }
    },
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
  });

  useEffect(() => {
    if (error && !formErrors) {
      toastState.addToast(error, ErrorStatus.danger);
    }
    if (data) {
      setIsSubmitted(true);
      setFormErrors({});
      toastState.addToast("Username updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  return (
    <div className="update-username">
      {!loading && (
        <Formik
          validationSchema={UsernameValidationSchema}
          validateOnMount={true}
          enableReinitialize
          initialValues={{ username: currentUsername || "" }}
          onSubmit={(values) =>
            updateUsername({
              variables: {
                username: values.username,
              },
            })
          }
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // If currentUsername is not the same as before, handle submit
                if (values.username && values.username !== currentUsername) {
                  isNotEmptyObject(errors) && setFormErrors(errors);
                  handleSubmit();
                } else {
                  setIsSubmitted(false);
                  setFormErrors({});
                }
              }}
            >
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="username">Username</label>
                  <InputErrorMessage
                    errorMessage={formErrors.username}
                    successMessage={"Username is valid"}
                    isSubmitted={isSubmitted}
                  />
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
                Save Username
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateUsername;
