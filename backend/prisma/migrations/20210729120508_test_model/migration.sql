/*
  Warnings:

  - You are about to drop the column `discplines` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "discplines";

-- CreateTable
CREATE TABLE "Discipline" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discipline.profileId_unique" ON "Discipline"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline.title_unique" ON "Discipline"("title");

-- AddForeignKey
ALTER TABLE "Discipline" ADD FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
