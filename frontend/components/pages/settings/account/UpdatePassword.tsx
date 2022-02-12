import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  UpdatePasswordInput,
  UpdatePasswordMutation,
  useUpdatePasswordMutation,
} from "generated/graphql";
import { UpdatePasswordValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

interface IProps {
  loading: boolean;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const UpdatePassword = ({ loading }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<UpdatePasswordInput>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updatePassword, { data, loading: updateLoading }] =
    useUpdatePasswordMutation({
      onError: (error) => {
        setFormErrors(error.graphQLErrors[0].extensions?.errors);
        setError(error.message);
      },
    });

  useEffect(() => {
    data && setFormErrors({});
  }, [data]);

  useToast<UpdatePasswordMutation>({
    data,
    successMessage: "Password updated successfully",
    formErrors,
    error,
  });

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
          onSubmit={async (values) => {
            await updatePassword({
              variables: {
                data: values,
              },
            });

            !updateLoading && setLastSubmit(values);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isNotEmptyObject(errors) && setFormErrors(errors);
                handleSubmit();
              }}
            >
              <InputField
                name="currentPassword"
                value={values.currentPassword}
                handleChange={handleChange}
                label="Current Password"
                type="password"
                placeholder="Please enter your current password"
                successMessage="Current password is valid"
                errorMessage={formErrors.currentPassword}
                lastSubmitValue={lastSubmit?.currentPassword}
              />
              <InputField
                name="newPassword"
                value={values.newPassword}
                handleChange={handleChange}
                label="New Password"
                type="password"
                placeholder="Please enter your new password"
                successMessage="New password is valid"
                errorMessage={formErrors.newPassword}
                lastSubmitValue={lastSubmit?.newPassword}
              />
              <InputField
                name="confirmPassword"
                value={values.confirmPassword}
                handleChange={handleChange}
                label="Confirm Password"
                type="password"
                placeholder="Please confirm new password"
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
