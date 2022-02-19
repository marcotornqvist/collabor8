import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  UpdateEmailMutation,
  useUpdateEmailMutation,
} from "generated/graphql";
import { EmailValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

interface FormErrors {
  email?: string;
}

interface IProps {
  currentEmail?: string;
  loading: boolean;
}

const UpdateEmail = ({ currentEmail, loading }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<UpdateEmailMutation>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updateEmail, { data }] = useUpdateEmailMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.updateEmail && user) {
        const merge = {
          ...user.loggedInUser,
          email: data.updateEmail,
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
    if (data) {
      setLastSubmit(data);
      setFormErrors({});
    }
  }, [data]);

  useToast<UpdateEmailMutation>({
    data,
    successMessage: "Email updated successfully",
    error,
    formErrors,
  });

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
                if (values.email !== currentEmail) {
                  isNotEmptyObject(errors) && setFormErrors(errors);
                  handleSubmit();
                } else {
                  setFormErrors({});
                }
              }}
            >
              <InputField
                name="email"
                value={values.email}
                handleChange={handleChange}
                label="Email"
                type="text"
                placeholder="Please enter your email address"
                successMessage="Email is valid"
                errorMessage={formErrors.email}
                lastSubmitValue={lastSubmit?.updateEmail}
              />
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
