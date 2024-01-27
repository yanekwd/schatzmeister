import { Transaction, TransactionCategory } from "composables/models";
import { defineStore } from "pinia";

const oneYearAgo = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1));

export const useTransactionsStore = defineStore("transactionsStore", () => {
  const config = useRuntimeConfig();

  const fetchedTransactions = reactive<{ transactions: Transaction[] }>({ transactions: [] });

  const fromDateFilter = ref<Date>(oneYearAgo());
  const toDateFilter = ref<Date>(new Date());

  const selectedCategories = ref<TransactionCategory[]>([]);

  async function fetchTransactions() {
    const selectedCategoriesString = selectedCategories.value.join("+");

    const queryParams = {
      from: fromDateFilter.value.toISOString(),
      to: toDateFilter.value.toISOString(),
      selectedCategoriesString: selectedCategoriesString,
    };

    const { data: transactions } = useAsyncData<Transaction[]>("transactions", async () => {
      const data = await $fetch<Transaction[]>("/transactions", { baseURL: config.public.baseURL as string, method: "GET", params: queryParams });
      data.forEach((e) => (e.transactionDate = new Date(e.transactionDate)));
      return data;
    });

    fetchedTransactions.transactions = transactions.value ?? [];
  }

  watch([fromDateFilter, toDateFilter, selectedCategories], fetchTransactions);

  return { fetchedTransactions };
});
