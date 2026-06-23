-- CreateTable
CREATE TABLE "SalesVoucher" (
    "id" SERIAL NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesVoucher_invoiceNo_key" ON "SalesVoucher"("invoiceNo");

-- AddForeignKey
ALTER TABLE "SalesVoucher" ADD CONSTRAINT "SalesVoucher_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
