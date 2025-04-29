-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "subject" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "notes" TEXT,
    "price" REAL NOT NULL,
    "trainer_price" REAL NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseTrainers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseTrainers_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseTrainers_B_fkey" FOREIGN KEY ("B") REFERENCES "Trainer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseTrainers_AB_unique" ON "_CourseTrainers"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseTrainers_B_index" ON "_CourseTrainers"("B");
