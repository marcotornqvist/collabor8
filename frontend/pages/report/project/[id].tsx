import React, { useState } from "react";
import { useRouter } from "next/router";
import { ReportValidationSchema } from "@/validations/schemas";
import { Formik } from "formik";
import {
  useReportProjectMutation,
  ReportProjectMutation,
  ReportProjectInput,
  Violation,
} from "generated/graphql";
import { isNotEmptyObject } from "utils/helpers";
import useToast from "@/hooks/useToast";
import button from "@/styles-modules/Button.module.scss";
import TextareaField from "@/components-modules/global/TextareaField";
import InputField from "@/components-modules/global/InputField";
import ViolationDropdown from "@/components-pages/report/ViolationDropdown";

interface IFormErrors {
  title?: string;
  body?: string;
  violation?: string;
}

const ReportProject = () => {
  const { query } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const [lastSubmit, setLastSubmit] = useState<
    Omit<ReportProjectInput, "projectId"> | undefined
  >(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<IFormErrors>({}); // UserInput Errors

  const [reportProject, { data }] = useReportProjectMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
  });

  useToast<ReportProjectMutation>({
    data,
    successMessage: "Project reported!",
    error,
    formErrors,
    redirect: "/projects",
  });

  const initialValues: Omit<ReportProjectInput, "projectId"> = {
    title: "",
    body: "",
    violation: Violation.Somethingelse,
  };

  return (
    <section className="report-project-page">
      <div className="container">
        <h2 className="title">Report Project</h2>
        <Formik
          validationSchema={ReportValidationSchema}
          validateOnMount={true}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values) => {
            const { data } = await reportProject({
              variables: {
                data: {
                  projectId: id,
                  title: values.title,
                  body: values.body,
                  violation: values.violation,
                },
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
              <ViolationDropdown
                selected={values.violation}
                setFieldValue={setFieldValue}
                error={error}
                lastSubmitValue={lastSubmit?.violation}
              />
              <TextareaField
                name="body"
                value={values.body}
                handleChange={handleChange}
                label="Description"
                placeholder="Enter a Report Description"
                successMessage="Description is valid"
                errorMessage={formErrors.body}
                lastSubmitValue={lastSubmit?.body}
              />
              <button
                type="submit"
                className={`${
                  isSubmitting ? button.green : button.lightGreen
                } submit-btn`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Reportig Project..." : "Report Project"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ReportProject;
