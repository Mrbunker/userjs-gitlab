<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import dayjs from "dayjs";
import { listRepositoryBranches, createMergeRequest } from "@/api/branch";
import { debounce, getUserName } from "@/lib/utils";
import { getUserEvents } from "@/api/user";
import { Branches, Projects } from "@/types";
import LabInput from "@/components/LabInput.vue";
import LabSelect from "@/components/LabSelect.vue";
import FormModal from "@/components/FormModal.vue";
import BranchDataList from "@/components/BranchDataList.vue";

defineProps<{
  open: boolean;
  starredPorjects: Projects;
}>();
const emit = defineEmits(["cancel"]);

const sourceBranchOptions = ref<Branches>([]);

const project = ref("");
const sourceBranch = ref("");
const targetBranchCache = JSON.parse(
  localStorage.getItem("form_cache_mr") ?? "{}"
)?.targetBranch;
const targetBranch = ref(targetBranchCache);
const mrTitle = ref("");

const today = dayjs().format("YYYYMMDD");

const handleCancel = () => emit("cancel");
const handleConfirm = async () => {
  localStorage.setItem(
    "form_cache_mr",
    JSON.stringify({ targetBranch: targetBranch.value })
  );
  const res = await createMergeRequest(project.value, {
    source_branch: sourceBranch.value,
    target_branch: targetBranch.value,
    title: mrTitle.value,
  });
  emit("cancel");
  window.location.href = res.web_url + `/diffs`;
};
const handleProjectChange = (e: Event) => {
  sourceBranch.value = "";
  mrTitle.value = "";
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

const fetchLatestPush = async () => {
  const username = import.meta.env.VITE_USER_NAME ?? getUserName();
  const events = await getUserEvents(username, {
    action: "pushed",
    per_page: 1,
  });
  const { project_id, push_data } = events[0];
  project.value = String(project_id);
  if (push_data && !/^(Merge|Revert|removed)/.test(push_data.commit_title)) {
    sourceBranch.value = String(push_data.ref);
  }
};

onMounted(async () => {
  fetchLatestPush();
});

watch([sourceBranch], () => debouncedFetchBranches());

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
    :open="open"
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
      @change="handleProjectChange"
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
    <BranchDataList
      id="targetBranchOptions"
      :more-options="[`releases/${today}`]"
    />

    <datalist id="sourceBranchOptions">
      <option v-for="item in sourceBranchOptions" :value="item.name"></option>
    </datalist>
  </FormModal>
</template>
