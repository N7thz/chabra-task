/*
  Warnings:

  - Added the required column `priority` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('URGENT', 'HIGH', 'MID', 'LOW');

-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_regionId_fkey";

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "priority" "Priority" NOT NULL;

-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "spaceId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cardId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
