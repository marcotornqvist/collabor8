import { useEffect, useState } from "react";
import { Formik } from "formik";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { useUpdatePasswordMutation } from "generated/graphql";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import isNotEmptyObject from "utils/isNotEmptyObject";
import { UpdatePasswordValidationSchema } from "@/validations/schemas";
import InputErrorMessage from "@/components-modules/global/InputErrorMessage";

interface IProps {
  loading: boolean;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const UpdatePassword = ({ loading }: IProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updatePassword, { data }] = useUpdatePasswordMutation({
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
      toastState.addToast("Password updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  return (
    <div className="update-password">
      {!loading && (
        <Formik
          validationSchema={UpdatePasswordValidationSchema}
          validateOnMount={true}
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) =>
            updatePassword({
              variables: {
                data: values,
              },
            })
          }
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isNotEmptyObject(errors) && setFormErrors(errors);
                handleSubmit();
              }}
            >
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="currentPassword">Current Password</label>
                  <InputErrorMessage
                    errorMessage={formErrors.currentPassword}
                    successMessage={"Current password is valid"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={values.currentPassword}
                  onChange={handleChange}
                  placeholder={"Please enter your current password"}
                  autoComplete="on"
                />
              </div>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="newPassword">New Password</label>
                  <InputErrorMessage
                    errorMessage={formErrors.newPassword}
                    successMessage={"New password is valid"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={values.newPassword}
                  onChange={handleChange}
                  placeholder={"Please enter your new password"}
                  autoComplete="on"
                />
              </div>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <InputErrorMessage
                    errorMessage={formErrors.confirmPassword}
                    successMessage={"Confirm password is valid"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder={"Please confirm new password"}
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
                {isSubmitting ? "Submitting..." : "Save Password"}
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdatePassword;
