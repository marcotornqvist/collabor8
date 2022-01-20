import { FormEvent, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LOGGED_IN_PROFILE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfile } from "generated/loggedInProfile";
import { UPDATE_PROFILE } from "@operations-mutations/updateProfile";
import { updateProfile, updateProfileVariables } from "generated/updateProfile";
import { toastState } from "store";
import { ErrorStatus } from "@types-enums/enums";
import { IDiscipline } from "@types-interfaces/form";
import input from "@styles-modules/Input.module.scss";
import button from "@styles-modules/Button.module.scss";
import CountriesDropdown from "./CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState<IDiscipline | null>(null);
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
      // Checks if logged in profile returns a discipline, either discipline stays null
      discipline &&
        setDiscipline({
          id: discipline.id,
          title: discipline.title,
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
