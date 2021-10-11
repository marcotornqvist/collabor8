import { useState } from "react";
import { UploadFile } from "@components-pages/myprofile/UploadFile";
import { gql, useMutation } from "@apollo/client";
import Sidebar from "@components-pages/settings/Sidebar";

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: updateProfileInput!) {
    updateProfile(data: $data) {
      firstName
      lastName
      country
      bio
      disciplineId
    }
  }
`;

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

const Profile = () => {
  const [firstName, setFirstName] = useState("john");
  const [lastName, setLastName] = useState("doe");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [disciplineId, setDisciplineId] = useState<number>();
  const [errors, setErrors] = useState<Errors>({});

  // Mutations:
  // Get all disciplines
  // Get all countries

  const [updateProfile, { data, loading, error }] = useMutation(
    UPDATE_PROFILE,
    {
      variables: {
        data: {
          firstName,
          lastName,
          bio,
          country,
          disciplineId,
        },
      },
      onError: (error) => setErrors(error.graphQLErrors[0].extensions?.errors),
    }
  );

  console.log(error?.message);

  if (loading) return <div>Submitting...</div>;

  return (
    <div className="settings-page">
      <div className="container">
        <Sidebar />
        <main className="profile">
          {/* <UploadFile /> */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setErrors({});
              updateProfile();
            }}
          >
            <div>
              {errors.firstName && <label>{errors.firstName}</label>}
              <input
                value={firstName}
                placeholder="firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div>
              {errors.lastName && <label>{errors.lastName}</label>}
              <input
                value={lastName}
                placeholder="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div>
              {/* {errors.firstName && <label>{errors.firstName}</label>} */}
              <input
                value={firstName}
                placeholder="firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <button type="submit">Save Settings</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
