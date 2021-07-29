-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- AlterTable
ALTER TABLE "Social" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Social" ADD FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
