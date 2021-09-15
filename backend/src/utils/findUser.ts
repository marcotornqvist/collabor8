import { verify } from "jsonwebtoken";

export async function findUser(authToken: string) {
  // find a user by auth token
  const token = authToken.split(" ")[1];
  const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
  return payload;
}
