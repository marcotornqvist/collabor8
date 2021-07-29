/*
  Warnings:

  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Social` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropIndex
DROP INDEX "Social_userId_unique";

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
DROP COLUMN "userId",
ADD PRIMARY KEY ("profileId");

-- AlterIndex
ALTER INDEX "Social_profileId_unique" RENAME TO "Social.profileId_unique";
