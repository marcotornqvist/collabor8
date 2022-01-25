// Converts the first character in every word to uppercase
export const capitalizeWords = (str?: string) => {
  const splitStr = str?.toLowerCase().split(" ");
  if (splitStr) {
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  } else {
    return "";
  }
};
