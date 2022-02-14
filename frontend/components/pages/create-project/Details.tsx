import React from "react";
import { dropdownVariants } from "utils/variants";
import { CreateProjectInput } from "generated/graphql";
import { FormikHandleChange } from "types/types";
import { FormErrors } from "./Form";
import InputField from "@/components-modules/global/InputField";
import TextareaField from "@/components-modules/global/TextareaField";
import CountriesDropdown from "../settings/profile/CountriesDropdown";
import DisciplinesDropdown from "./DisciplinesDropdown";

interface IProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChange: FormikHandleChange;
  isMobile: boolean;
  values: CreateProjectInput;
  error: string;
  formErrors: FormErrors;
  lastSubmit?: CreateProjectInput;
}

const Details = ({
  values,
  error,
  handleChange,
  formErrors,
  lastSubmit,
  isMobile,
  setFieldValue,
}: IProps) => {
  return (
    <div className="step-one details">
      <InputField
        name="title"
        value={values.title}
        handleChange={handleChange}
        label="Title"
        type="text"
        placeholder="Enter Title"
        successMessage="Title is valid"
        errorMessage={formErrors.title}
        lastSubmitValue={lastSubmit?.title}
      />
      <div className="wrapper">
        <CountriesDropdown
          selected={values.country}
          setFieldValue={setFieldValue}
          variants={
            isMobile ? dropdownVariants.slideIn : dropdownVariants.desktop
          }
          isMobile={isMobile}
          error={error}
          lastSubmitValue={lastSubmit?.country}
        />
        <DisciplinesDropdown
          setFieldValue={setFieldValue}
          disciplines={values.disciplines || []}
          variants={
            isMobile ? dropdownVariants.slideIn : dropdownVariants.desktop
          }
          isMobile={isMobile}
          error={error}
          lastSubmittedValues={lastSubmit?.disciplines}
        />
      </div>
      <TextareaField
        name="body"
        value={values.body}
        handleChange={handleChange}
        label="Description"
        placeholder="Enter a Project Description"
        successMessage="Description is valid"
        errorMessage={formErrors.body}
        lastSubmitValue={lastSubmit?.body}
      />
    </div>
  );
};

export default Details;
