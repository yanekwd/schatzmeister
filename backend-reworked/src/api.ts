import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

import { PrismaClient, Transaction, TransactionCategory, TransactionType } from "@prisma/client";
import express from "express";
import { parseTransactionsCAMTv2File } from "./fileParsing";
import { classifyTransactionTypeAndCategoryFromTransaction } from "./transactionClassification";
import { calcStatsPerCategory, calcStatsPerPeriod } from "./stats";

import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());

async function classifyAndPersistTransaction(transaction: Omit<Transaction, "transactionId" | "type" | "category">) {
  const classification = await classifyTransactionTypeAndCategoryFromTransaction(transaction);

  (transaction as Omit<Transaction, "transactionId">).type = classification.type;
  (transaction as Omit<Transaction, "transactionId">).category = classification.category;

  await prisma.transaction.create({ data: transaction as Omit<Transaction, "transactionId"> });
}

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.get("/transactionStats", async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  const stats = calcStatsPerCategory(transactions);
  const periodCost = calcStatsPerPeriod(transactions, "day");

  res.status(200).json({ stats: Object.fromEntries(stats), periodCost: periodCost });
});

app.post("/transaction", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("No transaction sent");
  }
  const transaction: Omit<Transaction, "transactionId" | "type" | "category"> = req.body;
  await classifyAndPersistTransaction(transaction);
  res.sendStatus(200);
});

app.get("/transaction/:id", async (req, res) => {
  const transactionId: number = parseInt(req.params.id);
  const transaction = await prisma.transaction.findFirst({ where: { transactionId: transactionId } });

  res.status(200).json(transaction);
});

app.delete("/transaction/:id", async (req, res) => {
  const transactionId: number = parseInt(req.params.id);

  try {
    await prisma.transaction.delete({ where: { transactionId: transactionId } });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.put("/transaction/:id", async (req, res) => {
  const transactionId: number = parseInt(req.params.id);
  const transactionData: Omit<Transaction, "transactionId"> | Transaction = req.body;

  await prisma.transaction.update({
    where: {
      transactionId: transactionId,
    },
    data: { ...transactionData },
  });

  res.sendStatus(200);
});

app.get("/transactions", async (req, res) => {
  const extractQueryParamList = (queryParam: string) => queryParam.split("+");

  let where: any = {
    transactionDate: {},
  };

  const fromTimestamp = req.query.from as string;
  const toTimestamp = req.query.to as string;
  const searchQuery = req.query.search as string;
  const categories = req.query.categories as string;
  const types = req.query.types as string;

  if (fromTimestamp != undefined) where.transactionDate.gt = new Date(fromTimestamp);
  if (toTimestamp != undefined) where.transactionDate.lte = new Date(toTimestamp);
  if (searchQuery != undefined) where.description = { contains: searchQuery };
  if (categories != undefined) where.category = { in: extractQueryParamList(categories) };
  if (types != undefined) where.type = { in: extractQueryParamList(categories) };

  const results = await prisma.transaction.findMany({
    where: where,
  });

  res.status(200).json(results);
});

app.post("/transactions", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("No transactions sent");
  }
  const transactions: Omit<Transaction, "transactionId" | "type" | "category">[] = req.body;
  await Promise.all(transactions.map((transaction) => classifyAndPersistTransaction(transaction)));

  res.sendStatus(200);
});

app.post("/uploadTransactionsFile", async (req, res) => {
  if (!req.body || !req.body.fileData) {
    return res.status(400).send("No file uploaded.");
  }
  const fileContentString = req.body.fileData;
  const transactions: Omit<Transaction, "transactionId">[] = await parseTransactionsCAMTv2File(fileContentString, ";");

  await prisma.transaction.createMany({
    data: transactions,
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
