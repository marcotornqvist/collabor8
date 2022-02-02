// Returns a single string
export const singleStringParam = {
  encode(value: string | (string | null)[] | null | undefined) {
    return value;
  },

  decode(strValue: string | (string | null)[] | null | undefined) {
    if (typeof strValue === "string") {
      return strValue;
    } else if (strValue && strValue.length >= 1) {
      return strValue[0];
    } else {
      return "";
    }
  },
};
