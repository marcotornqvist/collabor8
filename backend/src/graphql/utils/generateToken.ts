const jwt = require("jsonwebtoken");

interface IUser {
  id: string;
  email: string;
}

export const generateToken = (user: IUser) => {
  const { id, email } = user;

  return jwt.sign(
    {
      id,
      email,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: "30 days" }
  );
};
