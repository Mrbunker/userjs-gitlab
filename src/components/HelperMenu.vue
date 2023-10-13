<script setup lang="ts">
import { unsafeWindow } from "$";
import CreateBranchModal from "./CreateBranchModal.vue";
import MergeRequestModal from "./MergeRequestModal.vue";

const { handleMenu } = defineProps<{
  open: boolean;
  handleMenu: (show: boolean) => void;
}>();

const handleOpenMrDialog = () => {
  unsafeWindow.vue_mr_dialog.showModal();
  handleMenu(false);
};

const handleOpenCbDialog = () => {
  unsafeWindow.vue_cb_dialog.showModal();
  handleMenu(false);
};
</script>

<template>
  <div
    class="dropdown-menu dropdown-menu-right"
    :class="{ show: open }"
    @mouseleave="handleMenu(false)"
  >
    <ul>
      <li>
        <button type="button" class="btn menu-item" @click="handleOpenMrDialog">
          Create merge request
        </button>
      </li>
      <li>
        <button type="button" class="btn menu-item" @click="handleOpenCbDialog">
          Create branch
        </button>
      </li>
    </ul>
  </div>
  <MergeRequestModal />
  <CreateBranchModal />
</template>
