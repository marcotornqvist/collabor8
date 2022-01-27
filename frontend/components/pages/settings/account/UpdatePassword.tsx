import { useEffect, useState } from "react";
import { Formik } from "formik";
// import {
//   updatePassword,
//   updatePasswordVariables,
// } from "generated3/updatePassword";
// import {
//   loggedInUser,
//   loggedInUser_loggedInUser,
// } from "generated3/loggedInUser";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import { useUpdatePasswordMutation } from "generated/graphql";

interface IProps {
  loading: boolean;
}

const UpdatePassword = ({ loading }: IProps) => {
  const [error, setError] = useState("");
  const [updatePassword, { data }] = useUpdatePasswordMutation({
    update(cache, { data }) {
      // const user = cache.readQuery<loggedInUser>({
      //   query: GET_LOGGED_IN_USER,
      // });
      // if (data?.updatePassword && user) {
      //   // const merge: loggedInUser_loggedInUser = {
      //   //   ...user.loggedInUser,
      //   //   password: data.updatePassword,
      //   // };
      //   cache.writeQuery<loggedInUser>({
      //     query: GET_LOGGED_IN_USER,
      //     data: {
      //       loggedInUser: merge,
      //     },
      //   });
      // }
    },
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

  return (
    <div className="update-password">
      {!loading && (
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            setError("");
            // if (values.password && values.password !== password) {
            await updatePassword({
              variables: {
                data: values,
              },
            });
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="currentPassword">Current Password</label>
                  {/* {error && <span className="error-message">{error}</span>} */}
                  {/* {data && (
                    <span className="success-message">
                      Valid Current Password
                    </span>
                  )} */}
                </div>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  value={values.currentPassword}
                  onChange={handleChange}
                  placeholder={"Please enter your current password"}
                  autoComplete="on"
                />
              </div>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="newPassword">New Password</label>
                  {/* {error && <span className="error-message">{error}</span>} */}
                  {/* {data && (
                    <span className="success-message">Valid New Password</span>
                  )} */}
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="text"
                  value={values.newPassword}
                  onChange={handleChange}
                  placeholder={"Please enter your new password"}
                  autoComplete="on"
                />
              </div>
              <div className={`input-group ${input.group}`}>
                <div className="input-text">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  {/* {error && <span className="error-message">{error}</span>} */}
                  {/* {data && (
                    <span className="success-message">
                      Valid Confirm Password
                    </span>
                  )} */}
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
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
