import { FormikHandleChange } from "types/types";
import input from "@/styles-modules/Input.module.scss";

interface InputFieldProps {
  name: string;
  value: string;
  // Formik handleChange type
  handleChange: FormikHandleChange;
  label: string;
  type: "text" | "password";
  placeholder: string;
  successMessage?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
  autoComplete?: string;
  lastSubmitValue?: string | null;
}

const InputField = ({
  value,
  name,
  handleChange,
  label,
  successMessage,
  errorMessage,
  type,
  placeholder,
  autoComplete = "on",
  lastSubmitValue,
}: InputFieldProps) => {
  return (
    <div className={`input-group ${input.group}`}>
      <div className="input-text">
        <label htmlFor={name}>{label}</label>
        {errorMessage ? (
          <span className="error-message">{errorMessage}</span>
        ) : (
          lastSubmitValue === value &&
          value.length > 0 && (
            <span className="success-message">{successMessage}</span>
          )
        )}
      </div>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        className="input"
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputField;
