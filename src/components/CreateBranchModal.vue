<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { unsafeWindow } from "$";
import FormModal from "./FormModal.vue";
import LabInput from "./LabInput.vue";

const branchName = ref("");

const confirmDisabled = computed(() => !branchName.value);

const handleCancel = () => unsafeWindow.vue_mr_dialog.close();

const handleConfirm = async () => {};

onMounted(async () => {});
</script>

<template>
  <FormModal
    dialogId="vue_cb_dialog"
    modalTitle="create branch"
    :confirmDisabled="confirmDisabled"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <LabInput v-model="branchName" title="branch name" />
  </FormModal>
</template>
