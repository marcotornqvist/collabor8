/*
  Warnings:

  - You are about to drop the `_DisciplineToProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DisciplineToProfile" DROP CONSTRAINT "_DisciplineToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToProfile" DROP CONSTRAINT "_DisciplineToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "disciplineId" INTEGER;

-- DropTable
DROP TABLE "_DisciplineToProfile";

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
