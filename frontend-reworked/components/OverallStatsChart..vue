<template>
  <div>
    <canvas id="overall-stats-chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";

const props = defineProps<{
  data: { stat: string; value: number }[];
}>();

const options = {};

onMounted(() => {
  new Chart(document.getElementById("overall-stats-chart"), {
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
