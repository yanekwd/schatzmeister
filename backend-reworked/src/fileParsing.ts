import { Transaction } from "@prisma/client";
import { classifyTransactionTypeAndCategoryFromString } from "./transactionClassification";

export async function parseTransactionsCAMTv2File(fileContentString: string, delimiter: string) {
  const transactions: Omit<Transaction, "transactionId">[] = [];

  for (let line of fileContentString) {
    const cols = line.split(delimiter);
    const classification = await classifyTransactionTypeAndCategoryFromString(line);

    const transaction: Omit<Transaction, "transactionId"> = {
      paymentMethod: cols[3],
      amount: parseInt(cols[14]),
      currency: cols[15],
      transactionDate: new Date(cols[12]),
      clientOrRecipientName: cols[11],
      description: cols[4],
      type: classification.type,
      category: classification.category,
    };
    transactions.push(transaction);
  }

  return transactions;
}
