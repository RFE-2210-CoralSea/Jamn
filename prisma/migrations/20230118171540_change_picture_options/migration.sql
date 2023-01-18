/*
  Warnings:

  - You are about to drop the column `logo` on the `bands` table. All the data in the column will be lost.
  - You are about to alter the column `picture` on the `users` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(1000)`.
  - Added the required column `image` to the `bands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bands" DROP COLUMN "logo",
ADD COLUMN     "image" VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "image" VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "picture" SET DATA TYPE VARCHAR(1000);
