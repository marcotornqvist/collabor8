import { useState } from "react";
import {
  AddContactMutation,
  ContactStatusDocument,
  useAddContactMutation,
} from "generated/graphql";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
}

const AddContact = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [addContact, { data }] = useAddContactMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: ContactStatusDocument, // DocumentNode object parsed with gql
        variables: {
          id,
        },
      },
    ],
    onError: (error) => setError(error.message),
  });

  useToast<AddContactMutation>({
    data,
    successMessage: "Contact request sent",
    error,
  });

  return (
    <button
      onClick={() => {
        setError("");
        addContact();
      }}
      className="success-button"
    >
      <span>Add Person</span>
    </button>
  );
};

export default AddContact;
