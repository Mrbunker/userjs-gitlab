<script setup lang="ts">
import { onMounted, ref } from "vue";
import { unsafeWindow } from "$";
import { listAllProjects } from "@/api/project";
import LabInput from "./LabInput.vue";
import LabSelect from "./LabSelect.vue";

defineProps<{ open: boolean }>();
const starredPorjects = ref<{ id: string; name: string }[]>([]);
const project = ref("");
const sourceBranch = ref("");
const targetBranch = ref("");

const handleCancel = () => unsafeWindow.vue_mr_dialog.close();
const handleConfirm = (event: Event) => {
  console.log("|event", event);
  return;
  unsafeWindow.open("", "_blank");
};

onMounted(async () => {
  const res = await listAllProjects({
    starred: true,
  });
  starredPorjects.value = res;
});
</script>

<template>
  <dialog
    id="vue_mr_dialog"
    @submit="handleConfirm"
    class="tw-modal tw-bg-black tw-bg-opacity-60"
  >
    <form method="dialog" class="tw-modal-box tw-w-11/12 tw-max-w-5xl">
      <h3 class="tw-font-bold tw-text-lg tw-mb-5">create merge request</h3>

      <LabInput v-model="project" title="Project" autofocus />
      <LabInput v-model="targetBranch" title="target branch" />
      <LabInput v-model="sourceBranch" title="source branch" />
      <LabSelect
        title="Project"
        :options="starredPorjects"
        value-key="id"
        label-key="name"
      />

      <div class="tw-modal-action">
        <button type="button" class="btn" @click="handleCancel">cancel</button>
        <button type="submit" class="btn btn-success">confirm</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  color: rgb(46, 46, 46);
}
</style>
