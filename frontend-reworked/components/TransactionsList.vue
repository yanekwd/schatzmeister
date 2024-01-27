<template>
  <div class="divide-y">
    <div class="flex flex-row justify-between">
      <h2 class="mb-2 text-xl font-medium">Transactions</h2>
      <input type="search" v-model="searchQuery" class="w-1/4 px-4 py-2 text-sm border rounded shadow appearance-none outline-slate-200" placeholder="Search..." />
    </div>

    <template>
      <div v-for="dayGroup of dayGroups">
        <h3>{{ dayGroup.dayDate.toLocaleDateString() }}</h3>

        <ul>
          <transaction-list-entry v-for="transaction of dayGroup.transactions" :key="transaction.transactionId" :transaction="transaction"></transaction-list-entry>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Transaction } from "composables/models";
import TransactionListEntry from "./TransactionListEntry.vue";

const props = defineProps<{
  transactions: Transaction[];
}>();

const searchQuery = ref("");

const filteredTransactions = computed(() =>
  props.transactions.filter((trans) => {
    const transactionDescriptions = props.transactions.map((t) => t.description);
    const transactionClientOrRecipientNames = props.transactions.map((t) => t.clientOrRecipientName);

    if (transactionDescriptions.includes(searchQuery.value)) return true;
    if (transactionClientOrRecipientNames.includes(searchQuery.value)) return true;
    return false;
  })
);

function groupTransactionsByDay(transactions: Transaction[]) {
  const dayGroups: { dayDate: Date; transactions: Transaction[] }[] = [];

  const getDayGroupByDate = (date: Date) => {
    for (const dayGroup of dayGroups) {
      if (dayGroup.dayDate.toLocaleDateString() === date.toLocaleDateString()) return dayGroup;
    }
    return null;
  };

  for (const transaction of filteredTransactions.value) {
    const dayGroup = getDayGroupByDate(transaction.transactionDate);

    if (dayGroup === null) {
      const newDayGroup = {
        dayDate: new Date(transaction.transactionDate.getFullYear(), transaction.transactionDate.getMonth(), transaction.transactionDate.getDate()),
        transactions: [transaction],
      };
      dayGroups.push(newDayGroup);
      continue;
    }

    dayGroup.transactions.push(transaction);
  }

  return dayGroups;
}

const dayGroups = computed(() => groupTransactionsByDay(props.transactions));
</script>

<style scoped></style>
