export let accessToken = "";

export const setAccessToken = async (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};
