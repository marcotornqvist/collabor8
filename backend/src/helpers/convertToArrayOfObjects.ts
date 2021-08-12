export const convertToArrayOfObjects = (data: any) => {
  const array = [];

  for (const [key, country] of Object.entries(data)) {
    let test = { key, country };
    array.push(test);
  }

  return array;
};
