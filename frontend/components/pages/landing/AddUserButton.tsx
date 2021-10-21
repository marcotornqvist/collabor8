import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_REQUEST } from "@operations-mutations/sendContactRequest";
import { sendContactRequestVariables } from "generated/sendContactRequest";

interface IProps {
  id: string;
}

// Send request status to global state and toastify it

const AddUserButton = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [sendContactRequest, { data, loading }] =
    useMutation<sendContactRequestVariables>(SEND_CONTACT_REQUEST, {
      variables: {
        sendContactRequestId: id,
      },
      onError: (error) => setError(error.message),
    });
  return (
    <button
      className="add-btn"
      onClick={() => {
        setError("");
        sendContactRequest();
      }}
    >
      Add Person
    </button>
  );
};

export default AddUserButton;
