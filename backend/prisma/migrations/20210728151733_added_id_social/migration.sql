/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropTable
DROP TABLE "Project";

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER INDEX "Profile.userId_unique" RENAME TO "Profile_userId_unique";

-- AlterIndex
ALTER INDEX "Social.userId_unique" RENAME TO "Social_userId_unique";
