/*
  Warnings:

  - You are about to drop the column `slug` on the `Discipline` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Discipline_slug_key";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "slug";
