import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_REQUEST } from "@operations-mutations/sendContactRequest";
import { sendContactRequestVariables } from "generated/sendContactRequest";

interface IProps {
  id: string;
}

// Check if user is already in contacts list

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
    <li className="add-btn danger">
      <span
        onClick={() => {
          setError("");
          sendContactRequest();
        }}
      >
        Add Person
      </span>
    </li>
  );
};

export default AddUserButton;
