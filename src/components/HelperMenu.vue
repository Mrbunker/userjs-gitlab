<script setup lang="ts">
import { ref } from "vue";
import MergeRequestModal from "./MergeRequestModal.vue";

const { handleMenu } = defineProps<{
  open: boolean;
  handleMenu: (show: boolean) => void;
}>();

const modalShow = ref(false);

const handleDialog = () => {
  handleMenu(false);
  modalShow.value = !modalShow.value;
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
        <button type="button" class="btn menu-item" @click="handleDialog">
          create merge request
        </button>
      </li>
      <li>
        <button type="button" class="btn menu-item">Set status</button>
      </li>
    </ul>
  </div>
  <MergeRequestModal :open="modalShow" :handleClose="handleDialog" />
</template>
