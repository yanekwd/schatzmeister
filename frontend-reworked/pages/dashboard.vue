<template>
  <NuxtLayout>
    <div>
      <div class="flex flex-row justify-between">
        <div>
          <h1 class="mb-3 text-3xl font-semibold">Dashboard</h1>
          <h2 class="mb-6 font-normal text-gray-500 text-1xl">All your earnings and expenses in one gaze</h2>
        </div>
        <div class="flex flex-row items-start">
          <div class="px-4 py-2 text-sm border rounded shadow appearance-none round outline-slate-200">
            <input type="date" class="" v-model="fromDateFilter" />
            &nbsp; - &nbsp;
            <input type="date" class="" v-model="toDateFilter" />
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between w-full">
        <div class="overflow-hidden divide-x-2 rounded-t-md">
          <button class="px-4 py-2 appearance-none" :class="{ 'bg-slate-200': selectedTransactionTypeTab == 'all' }" @click="selectedTransactionTypeTab = 'all'">Earnings & Expenses</button>
          <button class="px-4 py-2 appearance-none" :class="{ 'bg-slate-200': selectedTransactionTypeTab == 'expenses' }" @click="selectedTransactionTypeTab = 'expenses'">Expenses only</button>
        </div>
        <category-selector v-if="selectedTransactionTypeTab == 'expenses'" @selected-categories-updated="selectedCategories = $event"></category-selector>
      </div>

      <div class="mb-7">
        <overall-stats-tab :transactions="transactions"></overall-stats-tab>
      </div>
      <development-chart :data="data" class="pt-4"></development-chart>
      <transactions-list class="pt-4" :transactions="transactions ?? []"> </transactions-list>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Transaction } from "@/composables/models";

const selectedTransactionTypeTab = ref<"all" | "expenses">("all");

const data = [
  { stat: "wurst", value: 29 },
  { stat: "b", value: 4 },
  { stat: "2", value: 21 },
  { stat: "a", value: 32 },
];

const fromDateFilter = ref("");
const toDateFilter = ref("");

const searchQuery = ref("");
const selectedCategories = ref("");

const queryParams = computed(() => {
  const params: any = {};

  if (searchQuery.value.length > 0) params.searchQuery = searchQuery.value;
  if (selectedCategories.value.length > 0) params.categories = selectedCategories.value;
  if (fromDateFilter.value.length > 0) params.from = fromDateFilter.value;
  if (toDateFilter.value.length > 0) params.to = toDateFilter.value;

  return params;
});

watch(
  queryParams,
  () => {
    console.log(queryParams.value);
    refresh();
  },
  { deep: true }
);
</script>
<style scoped></style>
