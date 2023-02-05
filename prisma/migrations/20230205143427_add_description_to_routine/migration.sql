/*
  Warnings:

  - Added the required column `description` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Routine_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("id", "image", "title", "user_created") SELECT "id", "image", "title", "user_created" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
