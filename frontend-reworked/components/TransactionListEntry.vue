<template>
  <li class="flex flex-row justify-between py-2 pr-3 mb-2 rounded-md hover:bg-slate-100 hover:cursor-pointer">
    <div class="flex flex-row align-middle">
      <div class="flex items-center justify-center px-3">
        <div class="flex items-center w-12 bg-blue-500 rounded-full aspect-square">
          <p class="mx-auto text-center" v-if="transaction.clientOrRecipientName != undefined">
            {{ transaction.clientOrRecipientName.charAt(0) }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="font-medium">{{ transaction.clientOrRecipientName }}</h4>
        <p class="mb-1 text-sm font-light">{{ transaction.description }}</p>

        <span class="px-2 py-1 text-xs font-light bg-green-500 rounded-full">{{ transaction.type }}</span>
        &middot;
        <span class="px-2 py-1 text-xs font-light rounded-full" :style="{ backgroundColor: getColorForTransactionCategory(transaction.category) }">{{ transaction.category }}</span>
      </div>
    </div>
    <div class="flex flex-col justify-end">
      <div class="">
        <span v-if="transaction.amount < 0" class="font-medium text-red-500"> {{ transaction.amount }} {{ transaction.currency }} </span>
        <span v-else class="font-medium text-green-500"> +{{ transaction.amount }} {{ transaction.currency }} </span>
        <p class="font-light">{{ formatDate(transaction.transactionDate) }}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import { Transaction } from "@/composables/models";

const props = defineProps({
  transaction: {
    type: Object as PropType<Transaction>,
    required: true,
  },
});

function formatDate(date: Date): string {
  console.log(date);

  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  const formattedDay: string = day < 10 ? `0${day}` : day.toString();
  const formattedMonth: string = month < 10 ? `0${month}` : month.toString();

  const formattedDate: string = `${formattedDay}.${formattedMonth}.${year}`;
  return formattedDate;
}
</script>

<style scoped></style>
