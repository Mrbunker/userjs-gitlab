<script setup lang="ts">
import { onMounted, ref } from "vue";
import { unsafeWindow } from "$";
import { listAllProjects } from "@/api/project";
import CreateBranchModal from "./CreateBranchModal.vue";
import MergeRequestModal from "./MergeRequestModal.vue";

const { handleMenu } = defineProps<{
  open: boolean;
  handleMenu: (show: boolean) => void;
}>();

const starredPorjects = ref<{ id: string; name: string }[]>([]);

onMounted(async () => {
  starredPorjects.value = await listAllProjects({ starred: true });
});

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
  <MergeRequestModal :starred-porjects="starredPorjects" />
  <CreateBranchModal :starred-porjects="starredPorjects" />
</template>
