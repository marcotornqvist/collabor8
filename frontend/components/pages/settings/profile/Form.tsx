import { FormEvent, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LOGGED_IN_PROFILE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfile } from "generated/loggedInProfile";
import { UPDATE_PROFILE } from "@operations-mutations/updateProfile";
import { updateProfile, updateProfileVariables } from "generated/updateProfile";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import input from "@styles-modules/Input.module.scss";
import button from "@styles-modules/Button.module.scss";
import CountriesDropdown from "./CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

interface IDiscipline {
  id: number | null;
  title: string | null;
}

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<string | null>("");
  const [discipline, setDiscipline] = useState<IDiscipline>();
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const { data } = useQuery<loggedInProfile>(GET_LOGGED_IN_PROFILE);

  useEffect(() => {
    if (data?.loggedInProfile) {
      const { firstName, lastName, country, bio, discipline } =
        data.loggedInProfile;

      setFirstName(firstName || "");
      setLastName(lastName || "");
      setCountry(country || "");
      setDiscipline({
        id: discipline?.id || null,
        title: discipline?.title || null,
      });
      setBio(bio || "");
    }
  }, [data]);

  // Remember to update cache
  const [updateProfile] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE,
    {
      variables: {
        data: {
          firstName,
          lastName,
          country,
          disciplineId: discipline?.id,
          bio,
        },
      },
      onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const { data } = await updateProfile();
    data && toastState.addToast("Profile settings saved", ErrorStatus.success);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <input
            className={input.default}
            value={firstName}
            placeholder="Your first name"
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div className="input-group">
          <div className="input-text">
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <input
            className={input.default}
            value={lastName}
            placeholder="Your last name"
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="on"
          />
        </div>
      </div>
      <div className="wrapper">
        <CountriesDropdown
          selected={country}
          setCountry={(country) => setCountry(country)}
        />
        <DisciplinesDropdown
          discipline={discipline}
          setDiscipline={(discipline) => setDiscipline(discipline)}
        />
      </div>
      <div className="input-group">
        <div className="input-text">
          <label htmlFor="bio">Bio</label>
          {errors.bio && <span>{errors.bio}</span>}
        </div>
        <textarea
          className={input.textarea}
          value={bio}
          placeholder="Write a bio"
          onChange={(e) => setBio(e.target.value)}
          autoComplete="on"
        />
      </div>
      <button type="submit" className={`${button.lightGreen} submit-btn`}>
        Save Settings
      </button>
    </form>
  );
};

export default Form;
