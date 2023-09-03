<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { unsafeWindow } from "$";
import { listAllProjects } from "@/api/project";
import { listRepositoryBranches, createMergeRequest } from "@/api/branch";
import { debounce, yyyyMMdd } from "@/lib/utils";
import LabInput from "./LabInput.vue";
import LabSelect from "./LabSelect.vue";

type Branchs = {
  can_push: boolean;
  name: string;
  commit: { id: string; message: string; title: string };
}[];

defineProps<{ open: boolean }>();
const starredPorjects = ref<{ id: string; name: string }[]>([]);
const sourceBranchOptions = ref<Branchs>([]);

const project = ref("");
const sourceBranch = ref("");
const targetBranch = ref("");
const mrTitle = ref("");

const handleCancel = () => unsafeWindow.vue_mr_dialog.close();
const handleConfirm = () => {
  createMergeRequest(project.value, {
    source_branch: sourceBranch.value,
    target_branch: targetBranch.value,
    title: mrTitle.value,
  });
  return;
  unsafeWindow.open("", "_blank");
};

const debug = () => {
  // console.log("starredPorjects", starredPorjects.value);
  // console.log("sourceBranchs", sourceBranchOptions.value);
  console.log("project", project.value);
  console.log("sourceBranch", sourceBranch.value);
  console.log("targetBranch", targetBranch.value);
};

onMounted(async () => {
  const res = await listAllProjects({
    starred: true,
  });
  starredPorjects.value = res;
});

const debouncedFetchBranches = debounce(async () => {
  if (!project.value || !sourceBranch.value) {
    return;
  }
  const res = await listRepositoryBranches(project.value, {
    search: sourceBranch.value,
  });
  sourceBranchOptions.value = res;
});
watch([project, sourceBranch], () => debouncedFetchBranches());

watchEffect(() => {
  const foundBranch = sourceBranchOptions.value.find(
    ({ name }) => name === sourceBranch.value,
  );
  if (foundBranch) {
    mrTitle.value = foundBranch.commit.title;
  }
});
</script>

<template>
  <dialog
    id="vue_mr_dialog"
    @submit="handleConfirm"
    class="tw-modal tw-bg-black tw-bg-opacity-60"
  >
    <form method="dialog" class="tw-modal-box tw-w-6/12 tw-max-w-5xl">
      <h3 class="tw-font-bold tw-text-lg tw-mb-5">create merge request</h3>
      <LabSelect
        v-model="project"
        title="Project"
        :options="starredPorjects"
        value-key="id"
        label-key="name"
      />
      <LabInput
        v-model="sourceBranch"
        title="source branch"
        :disabled="project === ''"
        list="sourceBranchOptions"
      />
      <LabInput
        v-model="targetBranch"
        title="target branch"
        list="targetBranchOptions"
        :disabled="project === ''"
      />
      <LabInput v-model="mrTitle" title="merge request title" />

      <div class="tw-modal-action">
        <button type="button" class="btn" @click="handleCancel">cancel</button>
        <button type="button" class="btn" @click="debug">debug</button>
        <button type="submit" class="btn btn-success">confirm</button>
      </div>

      <datalist id="targetBranchOptions">
        <option value="develop"></option>
        <option value="cq-develop"></option>
        <option value="master"></option>
        <option value="cq-master"></option>
        <option :value="`releases/${yyyyMMdd(new Date())}`"></option>
      </datalist>

      <datalist id="sourceBranchOptions">
        <option v-for="item in sourceBranchOptions" :value="item.name"></option>
      </datalist>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  color: rgb(46, 46, 46);
}
</style>
