import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import {
  CreateProjectMutation,
  ProjectByIdDocument,
  ProjectByIdQuery,
  useCreateProjectMutation,
  UsersQuery,
} from "generated/graphql";
import { ProjectValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import Details from "./Details";
import React from "react";
import useToast from "@/hooks/useToast";
import useIsMobile from "@/hooks/useIsMobile";
import Members from "./Members";
import { useRouter } from "next/router";

interface IProps {
  navigation: string;
  setNavigation: (navigation: string) => void;
}

export type User = NonNullable<UsersQuery["users"]>[0];

export interface FormValues {
  title: "";
  body: "";
  country: "";
  disciplines: number[];
  members: User[];
}

export interface FormErrors {
  title?: string;
  body?: string;
}

const Form = ({ navigation, setNavigation }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<FormValues | undefined>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // UserInput Errors
  const router = useRouter();

  const [createProject, { data }] = useCreateProjectMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
    update(cache, { data }) {
      if (data?.createProject) {
        const { createProject } = data;
        // Add logged in user to members list
        cache.writeQuery<ProjectByIdQuery>({
          query: ProjectByIdDocument,
          variables: {
            id: createProject.id,
          },
          data: {
            projectById: createProject,
          },
        });

        router.push(`/project/${createProject.id}`);
      }
    },
  });

  useToast<CreateProjectMutation>({
    data,
    successMessage: "Project created successfully!",
    error,
    formErrors,
  });

  useEffect(() => {
    if (formErrors.title || formErrors.body) {
      setNavigation("Details");
      window.scrollTo(0, 0);
    }
  }, [formErrors]);

  const { isMobile } = useIsMobile();

  const initialValues: FormValues = {
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
        const membersList = values.members.map((item) => item.id);
        const { data } = await createProject({
          variables: {
            data: {
              title: values.title,
              body: values.body,
              country: values.country,
              disciplines: values.disciplines,
              members: membersList,
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
          {navigation === "Details" ? (
            <Details
              values={values}
              error={error}
              isMobile={isMobile}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              lastSubmit={lastSubmit}
              formErrors={formErrors}
            />
          ) : (
            <Members
              setFieldValue={setFieldValue}
              members={values.members}
              isMobile={isMobile}
            />
          )}
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
