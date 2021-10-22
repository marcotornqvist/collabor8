import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_REQUEST } from "@operations-mutations/sendContactRequest";
import { sendContactRequestVariables } from "generated/sendContactRequest";
import useHover from "@hooks/useHover";

interface IProps {
  id: string;
  status?: string;
  setStatus: (status: string) => void;
}

const PendingContact = ({ id, status, setStatus }: IProps) => {
  const [sendContactRequest, { data, error }] =
    useMutation<sendContactRequestVariables>(SEND_CONTACT_REQUEST, {
      variables: {
        sendContactRequestId: id,
      },
    });

  useEffect(() => {
    if (data) {
      setStatus("success");
    }
    if (error) {
      setStatus("danger");
    }
  }, [data, error]);

  const [hoverRef, isHovered] = useHover<HTMLLIElement>();

  return (
    <li
      onClick={() => sendContactRequest()}
      ref={hoverRef}
      className={`danger-default${status ? " " + status : ""}`}
    >
      <span>{isHovered ? "Delete Request" : "Pending Request"}</span>
    </li>
  );
};

export default PendingContact;
