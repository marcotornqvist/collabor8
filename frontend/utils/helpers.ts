// Checks if object is not empty
export const isNotEmptyObject = (object: object) =>
  Object.keys(object).length > 0;

// Checks if object is empty
export const isEmptyObject = (object: object) =>
  Object.keys(object).length === 0;

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

export const truncateText = function (
  text: string,
  limit: number,
  characters: string = "..."
) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === " " &&
        (text.charAt(i - 1) != "," ||
          text.charAt(i - 1) != "." ||
          text.charAt(i - 1) != ";")
      ) {
        return text.substring(0, i) + characters;
      }
    }
  } else {
    return text;
  }
};

// Compares two arrays of numbers and returns true if they are the same
export function compareArr(arr1: number[], arr2: number[]) {
  arr1.sort();
  arr2.sort();
  return arr1 + "" == arr2 + "";
}
