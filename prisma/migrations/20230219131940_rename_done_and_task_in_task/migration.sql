/*
  Warnings:

  - You are about to drop the column `done` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `Task` table. All the data in the column will be lost.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "user_created" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    CONSTRAINT "Task_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("id", "routineId", "user_created") SELECT "id", "routineId", "user_created" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
