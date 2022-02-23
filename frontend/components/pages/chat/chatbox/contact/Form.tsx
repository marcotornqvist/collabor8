import React from "react";
import { Formik } from "formik";
import { useContactAddMessageMutation } from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import InputField from "@/components-modules/global/InputField";

interface IProps {
  chatId: string;
}

const Form = ({ chatId }: IProps) => {
  // const [message, setMessage] = useState("");

  const [contactAddMessage] = useContactAddMessageMutation();
  return (
    <div className="form-container">
      <Formik
        initialValues={{ body: "" }}
        onSubmit={(values) =>
          contactAddMessage({
            variables: {
              data: {
                id: chatId,
                body: values.body,
              },
            },
          })
        }
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              name="body"
              value={values.body}
              handleChange={handleChange}
              label=""
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
