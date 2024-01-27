<template>
  <div class="flex flex-row justify-between h-72">
    <div class="grid content-center w-2/3 grid-cols-3 grid-rows-3 gap-4 p-3">
      <div v-for="n in 9" :key="n">
        <label class="font-medium"> Test </label>
        <p>100€</p>
      </div>
    </div>

    <div class="w-1/3">
      <OverallStatsChart :data="data"></OverallStatsChart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Transaction } from "@/composables/models";

const props = defineProps({
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true,
  },
});

const data = [
  {
    stat: "fixed",
    value: 20,
  },
  {
    stat: "variable",
    value: 50,
  },
  {
    stat: "earning",
    value: 10,
  },
];
</script>

<style scoped></style>
