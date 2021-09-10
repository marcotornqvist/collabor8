// import { prisma } from "./context";

// // Checks if user is blocked by logged in user
// export const isBlocked = async (userId: string, id: string) => {
//   const isBlocked = await prisma.blockedUser.findUnique({
//     where: {
//       userId_blockedUserId: {
//         userId,
//         blockedUserId: id,
//       },
//     },
//   });


//   if (isBlocked) {
//     return true;
//   } else {
//     return false;
//   }
// };
