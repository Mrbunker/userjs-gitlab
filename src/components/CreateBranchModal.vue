<script setup lang="ts">
import { ref, computed } from "vue";
import { unsafeWindow } from "$";
import dayjs from "dayjs";
import { getUserName } from "@/lib/utils";
import FormModal from "./FormModal.vue";
import LabInput from "./LabInput.vue";
import LabSelect from "./LabSelect.vue";

defineProps<{
  starredPorjects: { id: string; name: string }[];
}>();

const project = ref("");
const prifix = ref(`feature/#`);
const userName = ref("-" + import.meta.env.VITE_USER_NAME ?? getUserName());
const date = ref(dayjs().format("YYYY-MM-DD"));
const branchName = computed(
  () => `${prifix.value}${userName.value}-${dayjs(date.value).format("YYMMDD")}`
);

const confirmDisabled = computed(() => !project.value || !prifix.value);

const handleCancel = () => unsafeWindow.vue_cb_dialog.close();

const handleConfirm = async () => {
  console.log("| ", project.value, branchName.value);
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
    <LabInput v-model="prifix" title="prifix" list="prefixOptions" autofocus />
    <LabInput v-model="userName" title="user" />
    <LabInput v-model="date" title="date" type="date" />
    <LabInput v-model="branchName" title="branch name" disabled />

    <datalist id="prefixOptions">
      <option value="feature/#"></option>
      <option value="fix/"></option>
    </datalist>
  </FormModal>
</template>
