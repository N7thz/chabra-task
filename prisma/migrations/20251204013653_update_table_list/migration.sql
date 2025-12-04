/*
  Warnings:

  - You are about to drop the column `cover_image` on the `cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cover_image",
ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "color" TEXT;
