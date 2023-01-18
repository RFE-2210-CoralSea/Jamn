/*
  Warnings:

  - Changed the type of `logo` on the `bands` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `audio` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pdf` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `picture` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "bands" DROP COLUMN "logo",
ADD COLUMN     "logo" BYTEA NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "text" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "audio",
ADD COLUMN     "audio" BYTEA NOT NULL,
DROP COLUMN "pdf",
ADD COLUMN     "pdf" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "picture",
ADD COLUMN     "picture" BYTEA NOT NULL,
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(1000);
