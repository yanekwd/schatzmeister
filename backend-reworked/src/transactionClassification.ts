import fs from "fs";
import path from "path";
import { createLanguageModel, createJsonTranslator } from "typechat";
import { TransactionClassification } from "./types";
import { Transaction } from "@prisma/client";

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join(__dirname, "types.ts"), "utf8");
const translator = createJsonTranslator<TransactionClassification>(model, schema, "TransactionClassification");

const basePrompt = "Please classify the type and the category of the following bank transaction: ";

export async function classifyTransactionTypeAndCategoryFromString(fileContentLine: string) {
  const prompt = basePrompt + fileContentLine;
  const response = await translator.translate(prompt);

  if (!response.success) {
    throw new Error("Bla");
  }

  const classification: TransactionClassification = response.data;
  return classification;
}

export async function classifyTransactionTypeAndCategoryFromTransaction(transaction: Omit<Transaction, "transactionId" | "type" | "category">) {
  const transactionString = JSON.stringify(transaction);
  return await classifyTransactionTypeAndCategoryFromString(transactionString);
}
