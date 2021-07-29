/*
  Warnings:

  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_unique" ON "Social"("userId");
