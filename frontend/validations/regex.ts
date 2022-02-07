// Checks that objectPosition returned from database is valid
export const objectPositionRegex = (value: string | null | undefined) => {
  const regex = new RegExp(/^(\d+|\d+[.]\d+)%?\s?(\d+|\d+[.]\d+)%$/);
  if (value && regex.test(value)) {
    return value;
  } else {
    return undefined;
  }
};
