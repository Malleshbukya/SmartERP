-- CreateTable
CREATE TABLE "StockItem" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "openingStock" DOUBLE PRECISION NOT NULL,
    "stockValue" DOUBLE PRECISION NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
