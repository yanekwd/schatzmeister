<template>
  <div class="w-100">
    <div class="flex flex-row flex-wrap h-screen">
      <aside class="flex flex-col w-1/4 p-4 mr-2 text-center align-top bg-yellow-400 shadow-xl justify-items-start">
        <h2 class="text-2xl font-medium">Schatzmeister</h2>

        <ul class="mt-6">
          <li v-for="(navItem, index) in navItems" :key="index" class="w-full">
            <NuxtLink class="w-full bg-white" :to="navItem.path"> {{ navItem.title }}</NuxtLink>
          </li>
        </ul>
      </aside>

      <main class="flex-grow px-8 py-6">
        <slot> </slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  {
    title: "Assistant",
    path: "assistant",
  },
  {
    title: "Dashboard",
    path: "dashboard",
  },
];
</script>

<style scoped></style>
