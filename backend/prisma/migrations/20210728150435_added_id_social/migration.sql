/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Social` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";

-- AlterTable
ALTER TABLE "Social" DROP CONSTRAINT "Social_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Social.userId_unique" ON "Social"("userId");
