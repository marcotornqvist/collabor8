// import { MiddlewareFn } from "type-graphql";
// import { verify } from "jsonwebtoken";
// import { Context } from "./context";

// // bearer 102930ajslkdaoq01

// export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
//   const authorization = context.req.headers["authorization"];

//   if (!authorization) {
//     throw new Error("not authenticated");
//   }

//   try {
//     const token = authorization.split(" ")[1];
//     const payload = verify(token, process.env.PRIVATE_KEY);
//     context.payload = payload as any;
//   } catch (err) {
//     console.log(err);
//     throw new Error("not authenticated");
//   }

//   return next();
// };
