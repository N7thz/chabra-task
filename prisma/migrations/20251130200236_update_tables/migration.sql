/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `regions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lists_name_key" ON "lists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "regions_name_key" ON "regions"("name");
