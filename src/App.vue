<script setup lang="ts">
import { ref } from "vue";
import HelperMenu from "@/components/HelperMenu.vue";

const svg =
  "http://gitlab.shxgroup.net/assets/icons-09fdf2c02921bad2ec7257465016a755f359ab7b598e5fe42c22381fe1a25045.svg#angle-down";
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
    helper
    <svg class="caret-down">
      <use :xlink:href="svg" />
    </svg>
  </a>

  <HelperMenu :open="menuShow" :handleMenu="handleMenu" />
</template>

<style scoped></style>
