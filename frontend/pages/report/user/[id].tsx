import React, { useState } from "react";
import { useRouter } from "next/router";
import { ReportValidationSchema } from "@/validations/schemas";
import { Formik } from "formik";
import {
  Violation,
  useReportUserMutation,
  ReportUserMutation,
  ReportUserInput,
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

const ReportUser = () => {
  const { query } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const [lastSubmit, setLastSubmit] = useState<
    Omit<ReportUserInput, "userId"> | undefined
  >(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<IFormErrors>({}); // UserInput Errors

  const [reportUser, { data }] = useReportUserMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
  });

  useToast<ReportUserMutation>({
    data,
    successMessage: "User reported!",
    error,
    formErrors,
    redirect: "/profiles",
  });

  const initialValues: Omit<ReportUserInput, "userId"> = {
    title: "",
    body: "",
    violation: Violation.Somethingelse,
  };

  return (
    <section className="report-user-page">
      <div className="container">
        <h2 className="title">Report User</h2>
        <Formik
          validationSchema={ReportValidationSchema}
          validateOnMount={true}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values) => {
            const { data } = await reportUser({
              variables: {
                data: {
                  userId: id,
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
                {isSubmitting ? "Reportig User..." : "Report User"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ReportUser;
