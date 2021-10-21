/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Discipline` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_slug_key" ON "Discipline"("slug");
