import { TransactionCategory } from "./models";

const colorUsageMap = new Map<string, string>([
  ["SAVINGS", "#BDD474"],
  ["INVESTMENTS", "#8B74D4"],
  ["RENT", "#FF8C00"],
  ["UTILITIES", "#E63946"],
  ["GROCERIES", "#0078D7"],
  ["DININGOUT", "#FFDE56"],
  ["TRANSPORTATION", "#C90076"],
  ["SHOPPING", "#001940"],
  ["ENTERTAINMENT", "#00C9C3"],
  ["TRAVEL", "#C96400"],
  ["INSURANCE", "#452D91"],
  ["MISCELLANEOUS", "#84C27B"],
]);

export function getColorForTransactionCategory(category: TransactionCategory) {
  if (Array.from(colorUsageMap.keys()).includes(category)) return colorUsageMap.get(category);
  return "#BDD474";
}
