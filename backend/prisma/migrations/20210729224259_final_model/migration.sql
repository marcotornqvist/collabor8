/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Profile` table. All the data in the column will be lost.
  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `Social` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_profileId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_unique";

-- DropIndex
DROP INDEX "Social.profileId_unique";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
DROP COLUMN "profileId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
