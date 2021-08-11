/*
  Warnings:

  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_countryId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "city",
DROP COLUMN "countryId",
ADD COLUMN     "country" TEXT;

-- DropTable
DROP TABLE "Country";
