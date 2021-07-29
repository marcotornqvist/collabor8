/*
  Warnings:

  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Social` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Social_userId_unique";

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("userId");
