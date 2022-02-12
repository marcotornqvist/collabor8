import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  UpdateUsernameMutation,
  useUpdateUsernameMutation,
} from "generated/graphql";
import { UsernameValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

interface IProps {
  currentUsername?: string;
  loading: boolean;
}

interface FormErrors {
  username?: string;
}

const UpdateUsername = ({ currentUsername, loading }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<UpdateUsernameMutation>(); // Last submit response values
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
    if (data) {
      setLastSubmit(data);
      setFormErrors({});
    }
  }, [data]);

  useToast<UpdateUsernameMutation>({
    data,
    successMessage: "Username updated successfully!",
    error,
    formErrors,
  });

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
                if (values.username !== currentUsername) {
                  isNotEmptyObject(errors) && setFormErrors(errors);
                  handleSubmit();
                } else {
                  setFormErrors({});
                }
              }}
            >
              <InputField
                name="username"
                value={values.username.toLowerCase()}
                handleChange={handleChange}
                label="Username"
                type="text"
                placeholder={"Please enter a username"}
                successMessage="Username is valid"
                errorMessage={formErrors.username}
                lastSubmitValue={lastSubmit?.updateUsername}
              />
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
