import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import input from "@/styles-modules/Input.module.scss";

interface InputFieldProps {
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
  url?: string;
  successMessage: string;
  errorMessage?: string;
  lastSubmitValue?: string | null;
}

const InputSocialField = ({
  value,
  handleChange,
  label,
  url,
  name,
  successMessage,
  errorMessage,
  lastSubmitValue,
}: InputFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  return (
    <div className={`input-group ${input.social}`}>
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
      <div
        className={`input-field${isFocus ? " focus" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        <span className="url">{url}</span>
        <input
          id={name}
          name={name}
          type="type"
          className="input"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </div>
    </div>
  );
};

export default InputSocialField;
