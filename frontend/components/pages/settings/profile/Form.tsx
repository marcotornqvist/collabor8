import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LOGGED_IN_PROFILE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfile } from "generated/loggedInProfile";
import { UPDATE_PROFILE } from "@operations-mutations/updateProfile";
import { updateProfile, updateProfileVariables } from "generated/updateProfile";
import inputStyles from "@styles-modules/Input.module.scss";
import button from "@styles-modules/Button.module.scss";

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

interface IForm {
  firstName: string;
  lastName: string;
  country: string;
  bio: string;
  disciplineId: number | null;
}

const Form = () => {
  const [formData, setFormData] = useState<IForm>({
    firstName: "",
    lastName: "",
    bio: "",
    country: "",
    disciplineId: null,
  });
  const [errors, setErrors] = useState<Errors>({});

  const { data } = useQuery<loggedInProfile>(GET_LOGGED_IN_PROFILE);

  useEffect(() => {
    if (data?.loggedInProfile) {
      const { firstName, lastName, country, bio, disciplineId } =
        data.loggedInProfile;

      setFormData({
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        country: country ?? "",
        bio: bio ?? "",
        disciplineId: disciplineId ?? null,
      });
    }
  }, [data]);

  // Query disciplines
  // Query countries

  const [updateProfile] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE,
    {
      variables: {
        data: formData,
      },
      onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
    }
  );

  const { firstName, lastName, bio, country, disciplineId } = formData;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setErrors({});
        updateProfile();
      }}
    >
      <div className="wrapper">
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <input
            className={inputStyles.input}
            value={firstName}
            placeholder="Your first name"
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
            }}
            autoComplete="on"
          />
        </div>
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <input
            className={inputStyles.input}
            value={lastName}
            placeholder="Your last name"
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
            autoComplete="on"
          />
        </div>
      </div>
      <button
        type="submit"
        className={button.green}
      >
        Save Settings
      </button>
    </form>
  );
};

export default Form;
