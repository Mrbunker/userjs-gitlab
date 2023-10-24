<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Projects } from "@/types";
import { listAllProjects } from "@/api/project";
import CreateBranchModal from "@/components/modals/CreateBranchModal.vue";
import MergeRequestModal from "@/components/modals/MergeRequestModal.vue";

const { handleMenu } = defineProps<{
  open: boolean;
  handleMenu: (show: boolean) => void;
}>();

const starredPorjects = ref<Projects>([]);
const mrModalOpen = ref(false);
const cbModalOpen = ref(false);

onMounted(async () => {
  starredPorjects.value = await listAllProjects({ starred: true });
});

const handleOpenMrDialog = () => {
  mrModalOpen.value = true;
  handleMenu(false);
};
const handleOpenCbDialog = () => {
  cbModalOpen.value = true;
  handleMenu(false);
};
const handleCloseMrDialog = () => {
  mrModalOpen.value = false;
};
const handleCloseCbDialog = () => {
  cbModalOpen.value = false;
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
      <!-- <li>
        <button type="button" class="btn menu-item" @click="debug">
          debug
        </button>
      </li> -->
    </ul>
  </div>

  <MergeRequestModal
    v-if="mrModalOpen"
    :open="mrModalOpen"
    @cancel="handleCloseMrDialog"
    :starred-porjects="starredPorjects"
  />
  <CreateBranchModal
    v-if="cbModalOpen"
    :open="cbModalOpen"
    @cancel="handleCloseCbDialog"
    :starred-porjects="starredPorjects"
  />
</template>
