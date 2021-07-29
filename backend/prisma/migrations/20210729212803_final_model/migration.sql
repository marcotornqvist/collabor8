/*
  Warnings:

  - You are about to drop the column `selected` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusCode" AS ENUM ('NOTFRIEND', 'PENDING', 'FRIEND');

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_projectId_fkey";

-- DropIndex
DROP INDEX "Discipline.profileId_unique";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "selected";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "from",
DROP COLUMN "projectId",
ADD COLUMN     "contactId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fromId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "profileImage" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "assignedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "GroupMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "status" "StatusCode" NOT NULL DEFAULT E'NOTFRIEND',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupMessage" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
