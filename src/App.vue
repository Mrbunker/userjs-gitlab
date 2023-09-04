<script setup lang="ts">
import { ref } from "vue";

import HelperMenu from "@/components/HelperMenu.vue";

const menuShow = ref(false);
const handleMenu = (show: boolean) => {
  menuShow.value = show;
};
</script>

<template>
  <a
    class="header-user-dropdown-toggle tw-cursor-pointer"
    @mouseenter="handleMenu(true)"
  >
    😎🤞
  </a>

  <HelperMenu :open="menuShow" :handle-menu="handleMenu" />
</template>

<style scoped></style>
