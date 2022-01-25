// Capitalizes the first letter in a string
export const capitalizeFirstLetter = (string?: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};
