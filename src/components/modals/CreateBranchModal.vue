<script setup lang="ts">
import { ref, computed } from "vue";
import { GM_setClipboard, unsafeWindow } from "$";
import dayjs from "dayjs";
import { getUserName } from "@/lib/utils";
import { createRepositoryBranch } from "@/api/branch";
import { Projects } from "@/types";
import FormModal from "@/components/FormModal.vue";
import LabInput from "@/components/LabInput.vue";
import LabSelect from "@/components/LabSelect.vue";
import BranchDataList from "@/components/BranchDataList.vue";

const { starredPorjects } = defineProps<{ starredPorjects: Projects }>();
const project = ref("");
const createFrom = ref("");
const prifix = ref(`feature/`);
const userName = ref("-" + import.meta.env.VITE_USER_NAME ?? getUserName());
const date = ref(dayjs().format("YYYY-MM-DD"));
const branchName = computed(
  () => `${prifix.value}${userName.value}-${dayjs(date.value).format("YYMMDD")}`
);

const confirmDisabled = computed(() => !createFrom.value || !prifix.value);

const handleCancel = () => unsafeWindow.vue_cb_dialog.close();

const handleConfirm = async () => {
  try {
    await createRepositoryBranch(project.value, {
      id: Number(project.value),
      branch: branchName.value,
      ref: createFrom.value,
    });
  } catch (error) {
    return;
  }
  alert(`create branch ${branchName.value} success`);
  GM_setClipboard(branchName.value, "text");

  // const projectInfo = starredPorjects.find(
  //   (item) => item.id === Number(project.value)
  // );
  // if (!projectInfo) {
  //   return;
  // }
  // const webUrl = projectInfo.web_url + `/tree/${branchName.value}`;
  // window.location.href = webUrl;
};
</script>

<template>
  <FormModal
    dialogId="vue_cb_dialog"
    modalTitle="Create branch"
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
      v-model="createFrom"
      title="create from"
      list="createFromOptions"
      :disabled="project === ''"
    />
    <LabInput v-model="prifix" title="prifix" list="prefixOptions" autofocus />
    <LabInput v-model="userName" title="user" hidden />
    <LabInput v-model="date" title="date" type="date" hidden />
    <LabInput v-model="branchName" title="branch name" />

    <datalist id="prefixOptions">
      <option value="feature/#"></option>
      <option value="fix/"></option>
    </datalist>

    <BranchDataList id="createFromOptions" />
  </FormModal>
</template>
