import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "@operations-mutations/addContact";
import { addContact, addContactVariables } from "generated/addContact";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";

interface IProps {
  id: string;
}

const AddContact = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [addContact] = useMutation<addContact, addContactVariables>(
    ADD_CONTACT,
    {
      variables: {
        addContactId: id,
      },
      refetchQueries: [
        {
          query: CONTACT_STATUS, // DocumentNode object parsed with gql
          variables: {
            contactStatusId: id,
          },
        },
      ],
      onError: (error) => setError(error.message),
    }
  );

  return (
    <li onClick={() => addContact()} className="success-hover">
      <span>Add Person</span>
    </li>
  );
};

export default AddContact;
