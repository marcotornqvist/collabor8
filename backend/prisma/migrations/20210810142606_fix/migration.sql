-- CreateEnum
CREATE TYPE "Violation" AS ENUM ('HARRASMENT', 'ADULTCONTENT', 'PLAGIARISM', 'SPAM', 'SCAM', 'FAKE', 'SOMETHINGELSE');

-- AlterTable
ALTER TABLE "ReportProject" ADD COLUMN     "violation" "Violation" NOT NULL DEFAULT E'SPAM';

-- AlterTable
ALTER TABLE "ReportUser" ADD COLUMN     "violation" "Violation" NOT NULL DEFAULT E'SPAM';
