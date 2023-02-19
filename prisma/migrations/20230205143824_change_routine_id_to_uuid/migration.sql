/*
  Warnings:

  - The primary key for the `Routine` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "user_created" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    CONSTRAINT "Task_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("done", "id", "routineId", "task", "user_created") SELECT "done", "id", "routineId", "task", "user_created" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_Routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Routine_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("description", "id", "image", "title", "user_created") SELECT "description", "id", "image", "title", "user_created" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
