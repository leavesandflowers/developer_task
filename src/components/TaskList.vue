<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const list = ref([
  { title: "1", description: "aaaaaaaaaaaa" },
  {
    title: "1",
    description:
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  },
]);
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      v-for="item in list"
      :key="item.title"
      class="flex w-1/2 h-auto mt-8 border-2 border-black"
    >
      <div
        class="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis mt-8 w-32"
      >
        {{ item.title }}
      </div>
      <div
        class="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis mt-8 w-32"
      >
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
