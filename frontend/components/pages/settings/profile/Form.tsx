import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LOGGED_IN_PROFILE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfile } from "generated/loggedInProfile";
import { UPDATE_PROFILE } from "@operations-mutations/updateProfile";
import { updateProfile, updateProfileVariables } from "generated/updateProfile";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import { IDiscipline } from "@types-interfaces/form";
import { Formik } from "formik";
import input from "@styles-modules/Input.module.scss";
import button from "@styles-modules/Button.module.scss";
import CountriesDropdown from "./CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";
import useWindowSize from "@hooks/useWindowSize";

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

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

interface IForm {
  firstName: string;
  lastName: string;
  country: string;
  discipline: IDiscipline | null;
  bio: string;
}

const Form = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { data, loading } = useQuery<loggedInProfile>(GET_LOGGED_IN_PROFILE);

  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const [updateProfile] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE,
    {
      // Update the cache profile values off the loggedInProfile
      update(cache, { data }) {
        if (data?.updateProfile) {
          cache.writeQuery<loggedInProfile>({
            query: GET_LOGGED_IN_PROFILE,
            data: {
              loggedInProfile: data.updateProfile,
            },
          });
        }
      },
      onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
    }
  );

  const handleUpdateProfile = async (values: IForm) => {
    setErrors({});

    const { firstName, lastName, country, discipline, bio } = values;

    const { data } = await updateProfile({
      variables: {
        data: {
          firstName,
          lastName,
          country,
          disciplineId: discipline?.id,
          bio,
        },
      },
    });
    data &&
      toastState.addToast("Profile updated successfully", ErrorStatus.success);
  };

  const initialValues: IForm = {
    firstName: data?.loggedInProfile?.firstName || "",
    lastName: data?.loggedInProfile?.lastName || "",
    country: data?.loggedInProfile?.country || "",
    discipline: data?.loggedInProfile?.discipline || null,
    bio: data?.loggedInProfile?.bio || "",
  };

  return (
    <>
      {!loading && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => handleUpdateProfile(values)}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="wrapper">
                <div className={`input-group ${input.group}`}>
                  <div className="input-text">
                    <label htmlFor="firstName">First Name</label>
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
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
                    {errors.lastName && <span>{errors.lastName}</span>}
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
                  {errors.bio && <span>{errors.bio}</span>}
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
