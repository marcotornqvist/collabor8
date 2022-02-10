import { useEffect, useState } from "react";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { ContactStatusDocument, useAddContactMutation } from "generated/graphql";

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
