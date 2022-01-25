import { IFields, LooseObject } from "../types/Interfaces";

interface IArgs<T> {
  fields: T;
  validationSchema: IFields;
}

type IErr = { inner: { path: string; errors: string[] }[] };
type IItem = { path: string; errors: string[] };

// Function can be used to validate multiple fields
export const validateFields = async <T>({
  fields,
  validationSchema,
}: IArgs<T>) => {
  // Validates fields based on the provided schema argument
  const validation = await validationSchema
    .validate(fields, { abortEarly: false })
    .then(() => {
      return {};
    })
    .catch((err: IErr) => {
      const errors: LooseObject = {};
      // Appends errors returned from yup validator to errors object
      err.inner.forEach((item: IItem) => {
        errors[item.path] = item.errors[0];
      });

      return errors;
    });

  return validation;
};
