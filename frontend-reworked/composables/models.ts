export type TransactionType = "EARNING" | "FIXEDCOST" | "VARIABLECOST";
export type TransactionCategory =
  | "SAVINGS"
  | "INVESTMENTS"
  | "RENT"
  | "UTILITIES"
  | "GROCERIES"
  | "DININGOUT"
  | "TRANSPORTATION"
  | "SHOPPING"
  | "ENTERTAINMENT"
  | "TRAVEL"
  | "INSURANCE"
  | "MISCELLANEOUS";

export type Transaction = {
  transactionId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  transactionDate: Date;
  clientOrRecipientName: string;
  description: string;
  type: TransactionType;
  category: TransactionCategory;
};
