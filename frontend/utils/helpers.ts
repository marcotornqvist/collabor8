// Checks if object is not empty
export const isNotEmptyObject = (object: object) =>
  Object.keys(object).length > 0;

export const isNumbersArray = (value: (number | null)[] | null | undefined) => {
  let result: number[] = [];

  if (typeof value === "string") {
    // Converts a string to a number and pushes that to the results array
    const number = parseInt(value);
    const isNumerical = !isNaN(number); // checks that number is valid
    isNumerical && result.push(number);
  } else if (value) {
    // Converts an array of strings to numbers
    const numbers = value.map(Number);
    const isNumerical = !numbers.some(isNaN); // checks that array of numbers includes only valid numbers
    isNumerical && (result = numbers); // overwrites results with new numbers array
  }

  return result;
};
