<script setup lang="ts">
import { ref } from "vue";
import MergeRequestModal from "./MergeRequestModal.vue";

const { handleMenu } = defineProps<{
  open: boolean;
  handleMenu: (show: boolean) => void;
}>();

const dialogShow = ref(false);

const handleOpenDialog = () => {
  window.vue_mr_dialog.showModal();
  handleMenu(false);
};
const handleDialogClose = () => {};
</script>

<template>
  <div
    class="dropdown-menu dropdown-menu-right"
    :class="{ show: open }"
    @mouseleave="handleMenu(false)"
  >
    <ul>
      <li>
        <button type="button" class="btn menu-item" @click="handleOpenDialog">
          create merge request
        </button>
      </li>
      <li>
        <button type="button" class="btn menu-item">Set status</button>
      </li>
    </ul>
  </div>
  <MergeRequestModal
    :open="dialogShow"
    :handleCloseDialog="handleDialogClose"
  />
</template>
