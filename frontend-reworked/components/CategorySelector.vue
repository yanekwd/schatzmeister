<template>
  <div ref="selectorDiv" class="relative h-10 px-4 py-2 text-sm border rounded shadow appearance-none round outline-slate-200">
    <button @click="categoriesExpanded = !categoriesExpanded">Categories &#x21d5;</button>

    <div v-if="categoriesExpanded" class="absolute right-0 z-20 p-3 bg-white rounded shadow-lg top-10">
      <input v-model="categorySearchQuery" type="search" class="px-4 py-1 mb-2 text-sm border rounded appearance-none outline-slate-200" placeholder="Search..." />

      <ul>
        <li class="mb-1" v-for="(option, index) in filteredUsageTypeOptions" :key="index">
          <input class="mr-2" type="checkbox" :name="option.usageType" v-model="option.selected" />
          <label :for="option.usageType"> {{ option.usageType }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const categoriesExpanded = ref(false);
const selectorDiv = ref<HTMLElement | null>(null);
const categorySearchQuery = ref("");

const emit = defineEmits<{
  (e: "selectedCategoriesUpdated", value: string): void;
}>();

document.addEventListener("click", function clickOutside(event: MouseEvent) {
  if (selectorDiv.value == null || selectorDiv.value == undefined) return;
  if (!(selectorDiv.value as HTMLElement).contains(event.target)) categoriesExpanded.value = false;
});

const filteredUsageTypeOptions = computed(() => {
  if (categorySearchQuery.value.length < 1) return usageTypeOptions;

  return usageTypeOptions.filter((item) => item.usageType.toLowerCase().includes(categorySearchQuery.value.toLowerCase()));
});

const usageTypeOptions = reactive([
  {
    usageType: "Groceries",
    selected: false,
    key: "groceries",
  },

  {
    usageType: "Pets",
    selected: true,
    key: "pets",
  },
  {
    usageType: "Transport",
    selected: false,
    key: "transport",
  },
  {
    usageType: "Dining out",
    selected: false,
    key: "dining_out",
  },
  {
    usageType: "Entertainment",
    selected: false,
    key: "entertainment",
  },
  {
    usageType: "Utilities",
    selected: true,
    key: "utilities",
  },
  {
    usageType: "Rent",
    selected: false,
    key: "rent",
  },
]);

const selectedCategoriesString = computed(() => {
  const selectedCategories = usageTypeOptions.filter((t) => t.selected === true);
  return selectedCategories.map((e) => e.key).join("+");
});

watch(selectedCategoriesString, () => {
  emit("selectedCategoriesUpdated", selectedCategoriesString.value);
});
</script>

<style scoped></style>
