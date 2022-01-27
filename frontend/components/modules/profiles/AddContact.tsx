import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "@/operations-mutations/addContact";
import { addContact, addContactVariables } from "generated/addContact";
import { CONTACT_STATUS } from "@/operations-queries/contactStatus";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";

interface IProps {
  id: string;
}

const AddContact = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [addContact, { data }] = useMutation<addContact, addContactVariables>(
    ADD_CONTACT,
    {
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: CONTACT_STATUS, // DocumentNode object parsed with gql
          variables: {
            id,
          },
        },
      ],
      onError: (error) => setError(error.message),
    }
  );

  useEffect(() => {
    if (data) {
      toastState.addToast("Contact request sent", ErrorStatus.success);
    }
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [data, error]);

  return (
    <button
      onClick={() => {
        setError("");
        addContact();
      }}
      className="success-hover"
    >
      <span>Add Person</span>
    </button>
  );
};

export default AddContact;
