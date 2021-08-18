// https://www.theverge.com/2020/2/5/21122943/instagram-how-to-username-change-handle-profile

// It needs to be unique to you. It’s also subject to more restrictions: it can’t be longer than 30 characters and can only contain letters, numbers, periods, and underscores.

interface IReturn {
  input: string | null | undefined;
  error: string | null | undefined;
}

export const instagramValidator = (
  input: string | null | undefined
): IReturn => {
  input = input?.trim();
  let error;
  // const regex = new RegExp(`${input}`, "/^[a-zA-Z0-9._]+$/");
  // if (regex) {
  //   console.log(regex);
  // error = "Your name Instagram is incorrect";
  // }

  return { input, error };
};

export const githubValidator = (input: String | undefined | null) => {
  const regex = new RegExp(`${input}`, "/^[A-z0-9-]+$/");
  console.log(regex);
  if (regex) {
    console.log("is ig");
    // throw new Exception("Your name Instagram is incorrect");
  }

  return "moi";
};
