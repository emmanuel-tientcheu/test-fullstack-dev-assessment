-- CreateTable
CREATE TABLE "_CourseSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingSubject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseSubjects_AB_unique" ON "_CourseSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseSubjects_B_index" ON "_CourseSubjects"("B");
