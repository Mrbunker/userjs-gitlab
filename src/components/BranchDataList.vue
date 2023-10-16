<script setup lang="ts">
const { moreOptions } = defineProps<{
  id: string;
  moreOptions?: string[];
}>();

const options = [
  "develop",
  "cq-develop",
  "master",
  "cq-master",
  ...(moreOptions ?? []),
];
</script>

<template>
  <datalist :id="id">
    <option v-for="option in options" :value="option" :key="option"></option>
    <slot></slot>
  </datalist>
</template>
