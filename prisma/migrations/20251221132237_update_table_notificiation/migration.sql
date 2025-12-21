/*
  Warnings:

  - You are about to drop the column `read` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "read",
ADD COLUMN     "recipientsDeleted" TEXT[],
ADD COLUMN     "recipientsRead" TEXT[];
