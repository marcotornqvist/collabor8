/*
  Warnings:

  - The `status` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MemberStatusCode" AS ENUM ('KICKED', 'REJECTED', 'PENDING', 'ACCEPTED');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatusCode" NOT NULL DEFAULT E'PENDING';
