/*
  Warnings:

  - You are about to drop the column `cardId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cardId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cardId",
DROP COLUMN "taskId";
