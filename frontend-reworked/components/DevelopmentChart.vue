<template>
  <div>
    <div class="flex flex-row justify-between">
      <h2 class="mb-2 text-xl font-medium">Development</h2>
      <div class="flex flex-row text-sm border divide-x-2 rounded shadow appearance-none round outline-slate-200">
        <button
          v-for="intervalOpt of intervalOptions"
          :key="intervalOpt.key"
          class="px-4 py-2 bg-slate-200"
          :class="{ 'bg-white': intervalOpt.key === selectedIntervalKey }"
          @click="selectedIntervalKey = intervalOpt.key"
        >
          {{ intervalOpt.label }}
        </button>
      </div>
    </div>

    <div>
      <canvas id="development-chart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";

const props = defineProps<{
  data: { stat: string; value: number }[];
}>();

const selectedIntervalKey = ref("daily");

const intervalOptions = reactive([
  {
    key: "daily",
    label: "Daily",
  },
  {
    key: "weekly",
    label: "Weekly",
  },
  {
    key: "monthly",
    label: "Monthly",
  },
  {
    key: "yearly",
    label: "Yearly",
  },
]);

const options = {};

onMounted(() => {
  new Chart(document.getElementById("overall-stats"), {
    type: "doughnut",
    data: {
      labels: props.data.map((row) => row.stat),
      datasets: [
        {
          label: "Acquisitions by year",
          data: props.data.map((row) => row.value),
        },
      ],
    },
  });
});
</script>

<style scoped></style>
