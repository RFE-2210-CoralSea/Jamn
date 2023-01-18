/*
  Warnings:

  - You are about to drop the column `content` on the `comments` table. All the data in the column will be lost.
  - Added the required column `date` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "content",
ADD COLUMN     "date" BIGINT NOT NULL,
ADD COLUMN     "text" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "date" BIGINT NOT NULL;
