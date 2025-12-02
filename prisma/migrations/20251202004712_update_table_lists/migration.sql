-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "listId" TEXT;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
