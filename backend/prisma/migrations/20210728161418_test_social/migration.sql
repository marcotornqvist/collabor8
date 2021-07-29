/*
  Warnings:

  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD PRIMARY KEY ("userId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_unique" ON "Social"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_profileId_unique" ON "Social"("profileId");

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
