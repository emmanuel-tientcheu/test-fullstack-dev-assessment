/*
  Warnings:

  - You are about to drop the column `training_subjects` on the `Trainer` table. All the data in the column will be lost.
  - Added the required column `name` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TrainingSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TrainerToTrainingSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TrainerToTrainingSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Trainer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TrainerToTrainingSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingSubject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trainer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Trainer" ("email", "id", "location") SELECT "email", "id", "location" FROM "Trainer";
DROP TABLE "Trainer";
ALTER TABLE "new_Trainer" RENAME TO "Trainer";
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSubject_name_key" ON "TrainingSubject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TrainerToTrainingSubject_AB_unique" ON "_TrainerToTrainingSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainerToTrainingSubject_B_index" ON "_TrainerToTrainingSubject"("B");
