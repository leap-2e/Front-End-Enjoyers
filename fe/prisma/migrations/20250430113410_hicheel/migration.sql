-- AlterTable
ALTER TABLE "User" ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "UserCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UserCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
