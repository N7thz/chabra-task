/*
  Warnings:

  - A unique constraint covering the columns `[spaceId,name]` on the table `lists` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "lists_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "lists_spaceId_name_key" ON "lists"("spaceId", "name");
