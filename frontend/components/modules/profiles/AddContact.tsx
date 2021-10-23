import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "@operations-mutations/addContact";
import { addContact, addContactVariables } from "generated/addContact";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";

interface IProps {
  id: string;
}

const AddContact = ({ id }: IProps) => {
  const [addContact, { data, error }] = useMutation<
    addContact,
    addContactVariables
  >(ADD_CONTACT, {
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
  });

  return (
    <li onClick={() => addContact()} className="success-hover">
      <span>Add Person</span>
    </li>
  );
};

export default AddContact;
