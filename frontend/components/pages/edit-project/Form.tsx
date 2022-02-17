import { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import {
  ProjectByIdDocument,
  ProjectByIdQuery,
  ProjectByIdQueryVariables,
  UpdateProjectMutation,
  useProjectFormValuesQuery,
  useUpdateProjectMutation,
} from "generated/graphql";
import { ProjectValidationSchema } from "@/validations/schemas";
import { isNotEmptyObject } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import React from "react";
import useToast from "@/hooks/useToast";
import Details from "@/components-modules/project-details/Details";

interface IProps {
  isMobile: boolean;
  id: string;
  navigation: string;
  setNavigation: (navigation: string) => void;
}

export interface IFormValues {
  title: string;
  body: string;
  country: string;
  disciplines: number[];
}

export interface IFormErrors {
  title?: string;
  body?: string;
}

const Form = ({ id, setNavigation, isMobile }: IProps) => {
  const [lastSubmit, setLastSubmit] = useState<IFormValues | undefined>(); // Last submit response values
  const [error, setError] = useState(""); // Error message, server error
  const [formErrors, setFormErrors] = useState<IFormErrors>({}); // UserInput Errors

  // Returns form data about the project
  const { data } = useProjectFormValuesQuery({
    variables: {
      data: {
        id,
      },
    },
  });

  const [updateProject, { data: editedData }] = useUpdateProjectMutation({
    onError: (error) => {
      setFormErrors(error.graphQLErrors[0].extensions?.errors);
      setError(error.message);
    },
    update(cache, { data }) {
      if (data?.updateProject) {
        const { updateProject } = data;

        const previous = cache.readQuery<
          ProjectByIdQuery,
          ProjectByIdQueryVariables
        >({
          query: ProjectByIdDocument,
          variables: {
            data: {
              id: updateProject.id,
            },
          },
        });

        // Add logged in user to members list
        cache.writeQuery<ProjectByIdQuery, ProjectByIdQueryVariables>({
          query: ProjectByIdDocument,
          variables: {
            data: {
              id: updateProject.id,
            },
          },
          data: {
            projectById: {
              ...updateProject,
              members: previous?.projectById?.members ?? [],
            },
          },
        });
      }
    },
  });

  useToast<UpdateProjectMutation>({
    data: editedData,
    successMessage: "Project updated successfully!",
    error,
    formErrors,
  });

  useEffect(() => {
    if (formErrors.title || formErrors.body) {
      setNavigation("Details");
      window.scrollTo(0, 0);
    }
  }, [formErrors]);

  // Returns all the disciplines as an array of numbers
  const disciplines: number[] = useMemo(() => {
    return data?.projectById?.disciplines
      ? data.projectById.disciplines.map((item) => item.id)
      : [];
  }, [data?.projectById?.disciplines]);

  const initialValues: IFormValues = {
    title: data?.projectById?.title ?? "",
    body: data?.projectById?.body ?? "",
    country: data?.projectById?.country ?? "",
    disciplines,
  };

  return (
    <Formik
      validationSchema={ProjectValidationSchema}
      validateOnMount={true}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        const { data } = await updateProject({
          variables: {
            data: {
              id,
              title: values.title,
              body: values.body,
              country: values.country,
              disciplines: values.disciplines,
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
          <Details
            isMobile={isMobile}
            error={error}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            lastSubmit={lastSubmit}
            formErrors={formErrors}
          />
          <button
            type="submit"
            className={`${
              isSubmitting ? button.green : button.lightGreen
            } submit-btn`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Edit Project"}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
