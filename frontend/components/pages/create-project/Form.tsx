import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  CreateProjectMutation,
  ProjectByIdDocument,
  ProjectByIdQuery,
  useCreateProjectMutation,
} from "generated/graphql";
import { ProjectValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import { useRouter } from "next/router";
import button from "@/styles-modules/Button.module.scss";
import React from "react";
import useToast from "@/hooks/useToast";
import useIsMobile from "@/hooks/useIsMobile";
import Details from "@/components-modules/project-details/Details";
import Members from "./Members";

interface IProps {
  navigation: string;
  setNavigation: (navigation: string) => void;
}

export type User = NonNullable<
  CreateProjectMutation["createProject"]["members"]
>[0]["user"];

export interface IFormValues {
  title: string;
  body: string;
  country: string;
  disciplines: number[];
  members: User[];
}

export interface IFormErrors {
  title?: string;
  body?: string;
}

const Form = ({ navigation, setNavigation }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<IFormValues | undefined>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<IFormErrors>({}); // UserInput Errors
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

  const initialValues: IFormValues = {
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
            data: {
              title: values.title,
              body: values.body,
              country: values.country,
              disciplines: values.disciplines,
              members: values?.members?.map((item) => item.id),
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
