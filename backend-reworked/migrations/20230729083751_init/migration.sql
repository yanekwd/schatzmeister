-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('SAVINGS', 'INVESTMENTS', 'RENT', 'UTILITIES', 'GROCERIES', 'DININGOUT', 'TRANSPORTATION', 'SHOPPING', 'ENTERTAINMENT', 'TRAVEL', 'INSURANCE', 'MISCELLANEOUS');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARNING', 'FIXEDCOST', 'VARIABLECOST');

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientOrRecipientName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "category" "TransactionCategory" NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);
