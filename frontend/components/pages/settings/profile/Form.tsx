import { useEffect, useState } from "react";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { IDiscipline } from "@/types-interfaces/form";
import { Formik } from "formik";
import {
  LoggedInAccountDetailsQuery,
  LoggedInProfileDetailsDocument,
  LoggedInProfileDetailsQuery,
  LoggedInUserDocument,
  LoggedInUserQuery,
  useLoggedInProfileDetailsQuery,
  useUpdateProfileMutation,
} from "generated/graphql";
import { UpdateProfileValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import input from "@/styles-modules/Input.module.scss";
import button from "@/styles-modules/Button.module.scss";
import CountriesDropdown from "./CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";
import useWindowSize from "@/hooks/useWindowSize";
import InputErrorMessage from "@/components-modules/global/InputErrorMessage";

const mobileVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const desktopVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

interface FormErrors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

interface IForm {
  firstName: string;
  lastName: string;
  country: string | null;
  discipline: IDiscipline | null;
  bio: string;
}

const Form = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const [updateProfile, { data }] = useUpdateProfileMutation({
    // Update the cache profile values off the logged in user
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.updateProfile && user) {
        cache.writeQuery<LoggedInUserQuery>({
          query: LoggedInUserDocument,
          data: {
            loggedInUser: {
              ...user.loggedInUser,
              profile: {
                ...data.updateProfile,
                profileImage: user.loggedInUser.profile?.profileImage,
              },
            },
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
      toastState.addToast("Profile updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  // Get saved form data
  const { data: formData, loading } = useLoggedInProfileDetailsQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded and authState is true..
  });

  const initialValues: IForm = {
    firstName: formData?.loggedInUser.profile?.firstName || "",
    lastName: formData?.loggedInUser.profile?.lastName || "",
    country: formData?.loggedInUser.profile?.country || null,
    discipline: formData?.loggedInUser.profile?.discipline || null,
    bio: formData?.loggedInUser.profile?.bio || "",
  };

  return (
    <>
      {!loading && (
        <Formik
          validationSchema={UpdateProfileValidationSchema}
          validateOnMount={true}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) =>
            updateProfile({
              variables: {
                data: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  country: values.country,
                  bio: values.bio,
                  disciplineId: values.discipline?.id,
                },
              },
            })
          }
        >
          {({
            values,
            errors,
            setFieldValue,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isNotEmptyObject(errors) && setFormErrors(errors);
                handleSubmit();
              }}
            >
              <div className="wrapper">
                <div className={`input-group ${input.group}`}>
                  <div className="input-text">
                    <label htmlFor="firstName">First Name</label>
                    <InputErrorMessage
                      errorMessage={formErrors.firstName}
                      successMessage={"First name is valid"}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={input.default}
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder={!loading ? "Your first name" : ""}
                    autoComplete="on"
                  />
                </div>
                <div className={`input-group ${input.group}`}>
                  <div className="input-text">
                    <label htmlFor="lastName">Last Name</label>
                    <InputErrorMessage
                      errorMessage={formErrors.lastName}
                      successMessage={"Last name is valid"}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className={input.default}
                    placeholder={!loading ? "Your last name" : ""}
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="wrapper">
                <CountriesDropdown
                  selected={values.country}
                  setFieldValue={setFieldValue}
                  loading={loading}
                  variants={isMobile ? mobileVariants : desktopVariants}
                  isMobile={isMobile}
                />
                <DisciplinesDropdown
                  setFieldValue={setFieldValue}
                  discipline={values.discipline}
                  loading={loading}
                  variants={isMobile ? mobileVariants : desktopVariants}
                  isMobile={isMobile}
                />
              </div>
              <div className={`input-group ${input.textarea_group}`}>
                <div className="input-text">
                  <label htmlFor="bio">Bio</label>
                  <InputErrorMessage
                    errorMessage={formErrors.bio}
                    successMessage={"Bio is valid"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  className={`textarea ${input.textarea}`}
                  placeholder={!loading ? "Write a bio" : ""}
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
                {isSubmitting ? "Submitting..." : "Save Settings"}
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Form;
