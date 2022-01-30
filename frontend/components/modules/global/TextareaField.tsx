import { ChangeEvent } from "react";
import input from "@/styles-modules/Input.module.scss";

interface TextareaFieldProps {
  name: string;
  value: string;
  // Formik handleChange type
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  label: string;
  placeholder: string;
  successMessage?: string;
  errorMessage?: string;
  lastSubmitValue?: string | null;
}

const TextareaField = ({
  value,
  handleChange,
  label,
  name,
  successMessage,
  errorMessage,
  placeholder,
  lastSubmitValue,
}: TextareaFieldProps) => {
  return (
    <div className={`input-group ${input.textarea_group}`}>
      <div className="input-text">
        <label htmlFor="bio">{label}</label>
        {errorMessage ? (
          <span className="error-message">{errorMessage}</span>
        ) : (
          lastSubmitValue === value &&
          value.length > 0 && (
            <span className="success-message">{successMessage}</span>
          )
        )}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        className="textarea"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaField;
