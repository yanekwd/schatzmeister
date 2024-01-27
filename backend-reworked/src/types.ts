type TransactionType = "EARNING" | "FIXEDCOST" | "VARIABLECOST";
type TransactionCategory = "SAVINGS" | "INVESTMENTS" | "RENT" | "UTILITIES" | "GROCERIES" | "DININGOUT" | "TRANSPORTATION" | "SHOPPING" | "ENTERTAINMENT" | "TRAVEL" | "INSURANCE" | "MISCELLANEOUS";

export type TransactionClassification = {
  type: TransactionType;
  category: TransactionCategory;
};
