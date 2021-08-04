/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member.userId_unique" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member.projectId_unique" ON "Member"("projectId");