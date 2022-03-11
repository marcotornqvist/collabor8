import React, { useState } from "react";
import { Formik } from "formik";
import { useContactAddMessageMutation } from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";
import useToast from "@/hooks/useToast";

interface IProps {
  chatId: string;
}

const Form = ({ chatId }: IProps) => {
  const [error, setError] = useState("");
  const [contactAddMessage] = useContactAddMessageMutation({
    onError: (error) => setError(error.message),
  });

  useToast({
    error,
  });

  return (
    <div className="form-container">
      <Formik
        initialValues={{ body: "" }}
        onSubmit={async (values, { resetForm }) => {
          const { data } = await contactAddMessage({
            variables: {
              data: {
                id: chatId,
                body: values.body,
              },
            },
          });

          data && resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              name="body"
              value={values.body}
              handleChange={handleChange}
              type="text"
              placeholder="Send message..."
            />
            <button type="submit" className={button.lightGreen}>
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
