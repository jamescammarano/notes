/*
  Warnings:

  - Added the required column `dominant_color` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Made the column `inverted_color` on table `Routine` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "inverted_color" TEXT NOT NULL,
    "dominant_color" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Routine_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("description", "id", "image", "inverted_color", "title", "user_created") SELECT "description", "id", "image", "inverted_color", "title", "user_created" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
