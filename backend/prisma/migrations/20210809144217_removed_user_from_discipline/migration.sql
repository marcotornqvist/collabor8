/*
  Warnings:

  - You are about to drop the column `users` on the `Discipline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "users",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
