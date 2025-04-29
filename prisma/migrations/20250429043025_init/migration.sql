-- CreateTable
CREATE TABLE "trainers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "training_subjects" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");
