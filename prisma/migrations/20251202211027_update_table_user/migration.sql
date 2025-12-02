/*
  Warnings:

  - You are about to drop the column `coverImage` on the `cards` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cnpj]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "coverImage",
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "cover_image" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "cards_cnpj_key" ON "cards"("cnpj");
