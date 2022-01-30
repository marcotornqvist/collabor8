import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  SocialInput,
  UpdateSocialsMutation,
  UpdateSocialsMutationVariables,
  useLoggedInSocialDetailsQuery,
  useUpdateSocialsMutation,
} from "generated/graphql";
import { Formik } from "formik";
import { UpdateSocialsValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import { ErrorStatus } from "@/types-enums/enums";
import { toastState } from "store";
import SettingsLayout from "@/components-pages/settings/SettingsLayout";
import button from "@/styles-modules/Button.module.scss";
import InputSocialField from "@/components-pages/settings/socials/InputSocialField";

interface FormErrors {
  instagram?: string;
  behance?: string;
  linkedin?: string;
  dribbble?: string;
  pinterest?: string;
  soundcloud?: string;
  spotify?: string;
  vimeo?: string;
  medium?: string;
  youtube?: string;
  github?: string;
  discord?: string;
}

const Socials = () => {
  const [lastSubmit, setLastSubmit] = useState<SocialInput>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [updateSocials, { data, loading: updateLoading }] =
    useUpdateSocialsMutation({
      // Update the cache socials values off the logged in user
      update(cache, { data }) {
        const user = cache.readQuery<LoggedInUserQuery>({
          query: LoggedInUserDocument,
        });

        if (data?.updateSocials && user) {
          cache.writeQuery<LoggedInUserQuery>({
            query: LoggedInUserDocument,
            data: {
              loggedInUser: {
                ...user.loggedInUser,
                socials: {
                  ...data.updateSocials,
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
      toastState.addToast("Socials updated successfully", ErrorStatus.success);
    }
  }, [error, data]);

  const { data: formData, loading } = useLoggedInSocialDetailsQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded and authState is true..
  });

  const initialValues: SocialInput = {
    instagram: formData?.loggedInUser.socials?.instagram || "",
    behance: formData?.loggedInUser.socials?.behance || "",
    discord: formData?.loggedInUser.socials?.discord || "",
    dribbble: formData?.loggedInUser.socials?.dribbble || "",
    github: formData?.loggedInUser.socials?.github || "",
    linkedin: formData?.loggedInUser.socials?.linkedin || "",
    medium: formData?.loggedInUser.socials?.medium || "",
    pinterest: formData?.loggedInUser.socials?.pinterest || "",
    soundcloud: formData?.loggedInUser.socials?.soundcloud || "",
    spotify: formData?.loggedInUser.socials?.spotify || "",
    vimeo: formData?.loggedInUser.socials?.vimeo || "",
    youtube: formData?.loggedInUser.socials?.youtube || "",
  };

  return (
    <div className="settings-socials">
      <div className="container">
        <h2 className="title">Social Accounts</h2>
        <>
          {!loading && (
            <Formik
              validationSchema={UpdateSocialsValidationSchema}
              validateOnMount={true}
              enableReinitialize
              initialValues={initialValues}
              onSubmit={async (values) => {
                await updateSocials({
                  variables: {
                    data: values,
                  },
                });

                !updateLoading && setLastSubmit(values);
              }}
            >
              {({
                values,
                errors,
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
                  <InputSocialField
                    name="behance"
                    value={values.behance}
                    handleChange={handleChange}
                    label="Behance Profile"
                    url="https://behance.net/"
                    successMessage="Behance username is valid"
                    errorMessage={formErrors.behance}
                    lastSubmitValue={lastSubmit?.behance}
                  />
                  <InputSocialField
                    name="discord"
                    value={values.discord}
                    handleChange={handleChange}
                    label="Discord Tag"
                    successMessage="Discord username is valid"
                    errorMessage={formErrors.discord}
                    lastSubmitValue={lastSubmit?.discord}
                  />
                  <InputSocialField
                    name="dribbble"
                    value={values.dribbble}
                    handleChange={handleChange}
                    label="Dribbble Profile"
                    url="https://dribbble.com/"
                    successMessage="Dribbble Profile URL is valid"
                    errorMessage={formErrors.dribbble}
                    lastSubmitValue={lastSubmit?.dribbble}
                  />
                  <InputSocialField
                    name="github"
                    value={values.github}
                    handleChange={handleChange}
                    label="Github Profile"
                    url="https://github.com/"
                    successMessage="Github username is valid"
                    errorMessage={formErrors.github}
                    lastSubmitValue={lastSubmit?.github}
                  />
                  <InputSocialField
                    name="instagram"
                    value={values.instagram}
                    handleChange={handleChange}
                    label="Instagram Profile"
                    url="https://www.instagram.com/"
                    successMessage="Instagram username is valid"
                    errorMessage={formErrors.instagram}
                    lastSubmitValue={lastSubmit?.instagram}
                  />
                  <InputSocialField
                    name="linkedin"
                    value={values.linkedin}
                    handleChange={handleChange}
                    label="LinkedIn Profile"
                    url="https://linkedin.com/in/"
                    successMessage="LinkedIn Profile URL is valid"
                    errorMessage={formErrors.linkedin}
                    lastSubmitValue={lastSubmit?.linkedin}
                  />
                  <InputSocialField
                    name="medium"
                    value={values.medium}
                    handleChange={handleChange}
                    label="Medium Profile"
                    url="https://medium.com/"
                    successMessage="Medium URL is valid"
                    errorMessage={formErrors.medium}
                    lastSubmitValue={lastSubmit?.medium}
                  />
                  <InputSocialField
                    name="pinterest"
                    value={values.pinterest}
                    handleChange={handleChange}
                    label="Pinterest Profile"
                    url="https://pinterest.com/"
                    successMessage="Pinterest Profile URL is valid"
                    errorMessage={formErrors.pinterest}
                    lastSubmitValue={lastSubmit?.pinterest}
                  />
                  <InputSocialField
                    name="soundcloud"
                    value={values.soundcloud}
                    handleChange={handleChange}
                    label="Soundcloud Profile"
                    url="https://soundcloud.com/"
                    successMessage="Soundcloud Profile URL is valid"
                    errorMessage={formErrors.soundcloud}
                    lastSubmitValue={lastSubmit?.soundcloud}
                  />
                  <InputSocialField
                    name="spotify"
                    value={values.spotify}
                    handleChange={handleChange}
                    label="Spotify Artist"
                    url="https://open.spotify.com/artist/"
                    successMessage="Spotify Artist URL is valid"
                    errorMessage={formErrors.spotify}
                    lastSubmitValue={lastSubmit?.spotify}
                  />
                  <InputSocialField
                    name="vimeo"
                    value={values.vimeo}
                    handleChange={handleChange}
                    label="Vimeo Profile"
                    url="https://vimeo.com/"
                    successMessage="Vimeo Profile URL is valid"
                    errorMessage={formErrors.vimeo}
                    lastSubmitValue={lastSubmit?.vimeo}
                  />
                  <InputSocialField
                    name="youtube"
                    value={values.youtube}
                    handleChange={handleChange}
                    label="Youtube Channel"
                    url="https://www.youtube.com/channel/"
                    successMessage="Youtube channel URL is valid"
                    errorMessage={formErrors.youtube}
                    lastSubmitValue={lastSubmit?.youtube}
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
      </div>
    </div>
  );
};

Socials.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Socials;
