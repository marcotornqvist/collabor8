import { useEffect, useState } from "react";
import { Formik } from "formik";
import { GET_LOGGED_IN_USER } from "@/operations-queries/getLoggedInUser";
import {
  LoggedInUserQuery,
  UpdateEmailMutationVariables,
  useUpdateEmailMutation,
} from "generated/graphql";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import { number } from "yup";
import { ErrorStatus } from "@/types-enums/enums";
import { toastState } from "store";
import { EmailValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import InputErrorMessage from "@/components-modules/global/InputErrorMessage";

interface IProps {
  currentEmail?: string;
  loading: boolean;
}

interface FormErrors {
  email?: string;
}

const UpdateEmail = ({ currentEmail, loading }: IProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updateEmail, { data }] = useUpdateEmailMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: GET_LOGGED_IN_USER,
      });

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
      toastState.addToast("Email updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  return (
    <div className="update-email">
      {!loading && (
        <Formik
          validationSchema={EmailValidationSchema}
          validateOnMount={true}
          enableReinitialize
          initialValues={{ email: currentEmail || "" }}
          onSubmit={(values) =>
            updateEmail({
              variables: {
                email: values.email,
              },
            })
          }
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // If currentEmail value is not the same as before, handle submit
                if (values.email && values.email !== currentEmail) {
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
                Save Email
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateEmail;
