import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_REQUEST } from "@operations-mutations/sendContactRequest";
import {
  sendContactRequest,
  sendContactRequestVariables,
} from "generated/sendContactRequest";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";

interface IProps {
  id: string;
  status?: string;
  setStatus: (status: string) => void;
}

const AddContact = ({ id, status, setStatus }: IProps) => {
  const [sendContactRequest, { data, error }] = useMutation<
    sendContactRequest,
    sendContactRequestVariables
  >(SEND_CONTACT_REQUEST, {
    variables: {
      sendContactRequestId: id,
    },
    refetchQueries: [
      CONTACT_STATUS, // DocumentNode object parsed with gql
      "getContactStatus", // Query name
    ],
  });

  useEffect(() => {
    if (data) {
      setStatus("success");
    }
    if (error) {
      setStatus("danger");
    }
  }, [data, error]);

  return (
    <li
      onClick={() => sendContactRequest()}
      className={`success-default${status ? " " + status : ""}`}
    >
      <span>Add Person</span>
    </li>
  );
};

export default AddContact;
