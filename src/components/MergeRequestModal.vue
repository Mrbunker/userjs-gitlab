<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { unsafeWindow } from "$";
import { listRepositoryBranches, createMergeRequest } from "@/api/branch";
import { debounce } from "@/lib/utils";
import dayjs from "dayjs";
import LabInput from "./LabInput.vue";
import LabSelect from "./LabSelect.vue";
import FormModal from "./FormModal.vue";

defineProps<{
  starredPorjects: { id: string; name: string }[];
}>();

type Branchs = {
  can_push: boolean;
  name: string;
  commit: { id: string; message: string; title: string };
}[];

const sourceBranchOptions = ref<Branchs>([]);

const project = ref("");
const sourceBranch = ref("");
const targetBranch = ref("");
const mrTitle = ref("");

const today = dayjs().format("YYYYMMDD");

const handleCancel = () => unsafeWindow.vue_mr_dialog.close();
const handleConfirm = async () => {
  const res = await createMergeRequest(project.value, {
    source_branch: sourceBranch.value,
    target_branch: targetBranch.value,
    title: mrTitle.value,
  });
  window.location.href = res.web_url;
};

const confirmDisabled = computed(
  () =>
    !project.value ||
    !sourceBranch.value ||
    !targetBranch.value ||
    !mrTitle.value
);

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
    ({ name }) => name === sourceBranch.value
  );
  if (foundBranch) {
    mrTitle.value = foundBranch.commit.title;
  }
});
</script>

<template>
  <FormModal
    dialogId="vue_mr_dialog"
    modalTitle="Create merge request"
    :confirmDisabled="confirmDisabled"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
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

    <datalist id="targetBranchOptions">
      <option value="develop"></option>
      <option value="cq-develop"></option>
      <option value="master"></option>
      <option value="cq-master"></option>
      <option :value="`releases/${today}`"></option>
    </datalist>

    <datalist id="sourceBranchOptions">
      <option v-for="item in sourceBranchOptions" :value="item.name"></option>
    </datalist>
  </FormModal>
</template>
