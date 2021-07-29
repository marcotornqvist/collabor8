/*
  Warnings:

  - You are about to drop the column `profileId` on the `Discipline` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_profileId_fkey";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "profileId",
ADD COLUMN     "users" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
