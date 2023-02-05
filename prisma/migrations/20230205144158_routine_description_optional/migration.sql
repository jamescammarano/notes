-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Routine_user_created_fkey" FOREIGN KEY ("user_created") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("description", "id", "image", "title", "user_created") SELECT "description", "id", "image", "title", "user_created" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
