import React from "react";

interface IProps {
  errorMessage?: string;
  successMessage: string;
  isSubmitted: boolean;
}

const InputErrorMessage = ({
  errorMessage,
  successMessage,
  isSubmitted,
}: IProps) => {
  return (
    <>
      {errorMessage ? (
        <span className="error-message">{errorMessage}</span>
      ) : (
        isSubmitted && (
          <span className="success-message">{successMessage}</span>
        )
      )}
    </>
  );
};

export default InputErrorMessage;
