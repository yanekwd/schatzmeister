import { Transaction, TransactionCategory } from "@prisma/client";

export function calcStatsPerCategory(transactions: Transaction[]) {
  const transactionCategoryMap = new Map<TransactionCategory, Transaction[]>();
  const transactionCategoryStatsMap = new Map<TransactionCategory, [number, number]>();

  let overallCosts = 0;

  for (let transaction of transactions) {
    if (transaction.type == "EARNING") continue;

    if (!transactionCategoryMap.has(transaction.category)) {
      transactionCategoryMap.set(transaction.category, []);
    }

    transactionCategoryMap.get(transaction.category)!.push(transaction);
    overallCosts += transaction.amount;
  }

  transactionCategoryMap.forEach((transactions, category) => {
    const categoryCost = transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    const categoryCostPercentage = categoryCost / overallCosts;

    transactionCategoryStatsMap.set(category, [categoryCost, parseFloat(categoryCostPercentage.toFixed(3))]);
  });

  return transactionCategoryStatsMap;
}

export function calcStatsPerPeriod(transactions: Transaction[], period: "day" | "week" | "month" | "year") {
  transactions.sort((a, b) => (a.transactionDate.getTime() > b.transactionDate.getTime() ? 1 : -1));
  const costPeriodArray: [number, number][] = [];
  const oldestDate = transactions[transactions.length - 1].transactionDate;

  const dayOffset = 24 * 60 * 60 * 1000;
  const dateOffset = {
    day: dayOffset,
    week: dayOffset * 7,
    month: dayOffset * 30,
    year: dayOffset * 365,
  };

  let currentDateIndex = new Date().getTime();
  while (currentDateIndex > oldestDate.getTime()) {
    const lowerDateThreshold = currentDateIndex - dateOffset[period];
    let periodCost = 0;

    for (let transaction of transactions) {
      if (transaction.transactionDate.getTime() > currentDateIndex) continue;
      if (transaction.transactionDate.getTime() <= lowerDateThreshold) continue;

      periodCost += transaction.amount;
    }

    costPeriodArray.push([currentDateIndex, periodCost]);
    currentDateIndex = lowerDateThreshold;
  }

  console.log(costPeriodArray);
  return costPeriodArray;
}
