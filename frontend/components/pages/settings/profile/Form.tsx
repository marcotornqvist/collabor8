import { useEffect, useState } from "react";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { IDiscipline } from "@/types-interfaces/form";
import { Formik } from "formik";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  UpdateProfileInput,
  UpdateProfileMutation,
  useLoggedInProfileDetailsQuery,
  useUpdateProfileMutation,
} from "generated/graphql";
import { UpdateProfileValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import CountriesDropdown from "./CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";
import useWindowSize from "@/hooks/useWindowSize";
import InputField from "@/components-modules/global/InputField";
import TextareaField from "@/components-modules/global/TextareaField";

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

interface InitialValues {
  firstName: string;
  lastName: string;
  country: string | null;
  discipline: IDiscipline | null;
  bio: string;
}

const Form = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lastSubmit, setLastSubmit] = useState<any>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const [updateProfile, { data, loading: updateLoading }] =
    useUpdateProfileMutation({
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
      setFormErrors({});
      toastState.addToast("Profile updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  // Get saved form data
  const { data: formData, loading } = useLoggedInProfileDetailsQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded and authState is true..
  });

  const initialValues: InitialValues = {
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
          onSubmit={async (values) => {
            await updateProfile({
              variables: {
                data: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  country: values.country,
                  bio: values.bio,
                  disciplineId: values.discipline?.id,
                },
              },
            });

            !updateLoading && setLastSubmit(values);
          }}
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
                <InputField
                  name="firstName"
                  value={values.firstName}
                  handleChange={handleChange}
                  label="First name"
                  type="text"
                  placeholder={!loading ? "Enter your first name" : ""}
                  successMessage="First name is valid"
                  errorMessage={formErrors.firstName}
                  lastSubmitValue={lastSubmit?.firstName}
                />
                <InputField
                  name="lastName"
                  value={values.lastName}
                  handleChange={handleChange}
                  label="Last name"
                  type="text"
                  placeholder={!loading ? "Enter your last name" : ""}
                  successMessage="Last name is valid"
                  errorMessage={formErrors.lastName}
                  lastSubmitValue={lastSubmit?.lastName}
                />
              </div>
              <div className="wrapper">
                <CountriesDropdown
                  selected={values.country}
                  setFieldValue={setFieldValue}
                  loading={loading}
                  variants={isMobile ? mobileVariants : desktopVariants}
                  isMobile={isMobile}
                  error={error}
                  lastSubmitValue={lastSubmit?.country}
                />
                <DisciplinesDropdown
                  setFieldValue={setFieldValue}
                  discipline={values.discipline}
                  loading={loading}
                  variants={isMobile ? mobileVariants : desktopVariants}
                  isMobile={isMobile}
                  error={error}
                  lastSubmitValue={lastSubmit?.discipline}
                />
              </div>
              <TextareaField
                name="bio"
                value={values.bio}
                handleChange={handleChange}
                label="Bio"
                placeholder={!loading ? "Write a bio" : ""}
                successMessage="Bio is valid"
                errorMessage={formErrors.bio}
                lastSubmitValue={lastSubmit?.bio}
              />
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
