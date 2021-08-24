-- CreateTable
CREATE TABLE "_DisciplineToProject" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplineToProject_AB_unique" ON "_DisciplineToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplineToProject_B_index" ON "_DisciplineToProject"("B");

-- AddForeignKey
ALTER TABLE "_DisciplineToProject" ADD FOREIGN KEY ("A") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
