import { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  CreateProjectInput,
  CreateProjectMutation,
  useCreateProjectMutation,
} from "generated/graphql";
import { ProjectValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import useWindowSize from "@/hooks/useWindowSize";
import Details from "./Details";
import React from "react";
import useToast from "@/hooks/useToast";

export interface FormErrors {
  title?: string;
  body?: string;
}

const Form = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [lastSubmit, setLastSubmit] = useState<
    CreateProjectInput | undefined
  >(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors

  const [createProject, { data }] = useCreateProjectMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
  });

  useToast<CreateProjectMutation>({
    data,
    successMessage: "Project created successfully!",
    error,
    formErrors,
    redirect: "/projects",
  });

  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const initialValues: CreateProjectInput = {
    title: "",
    body: "",
    country: "",
    disciplines: [],
    members: [],
  };

  return (
    <Formik
      validationSchema={ProjectValidationSchema}
      validateOnMount={true}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        const { data } = await createProject({
          variables: {
            data: values,
          },
        });

        if (data) {
          setFormErrors({});
          setLastSubmit(undefined);
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFormErrors({});
            isNotEmptyObject(errors) && setFormErrors(errors);
            handleSubmit();
          }}
        >
          <Details
            values={values}
            error={error}
            isMobile={isMobile}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            lastSubmit={lastSubmit}
            formErrors={formErrors}
          />
          {/* <Members
            setFieldValue={setFieldValue}
            disciplines={values.disciplines || []}
            loading={loading}
            variants={
              isMobile ? dropdownVariants.slideIn : dropdownVariants.desktop
            }
            isMobile={isMobile}
            error={error}
            lastSubmittedValues={lastSubmit?.disciplines}
          /> */}
          <button
            type="submit"
            className={`${
              isSubmitting ? button.green : button.lightGreen
            } submit-btn`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Project..." : "Create Project"}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
