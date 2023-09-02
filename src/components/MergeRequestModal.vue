<script setup lang="ts">
import { ref } from "vue";
import { unsafeWindow } from "$";
import LabInput from "./LabInput.vue";

defineProps<{ open: boolean }>();
const project = ref("");
const sourceBranch = ref("");
const targetBranch = ref("");

const handleCancel = () => unsafeWindow.vue_mr_dialog.close();
const handleConfirm = (event: Event) => {
  console.log("|event", event);
  return;
  unsafeWindow.open("", "_blank");
};
</script>

<template>
  <dialog
    id="vue_mr_dialog"
    @submit="handleConfirm"
    className="tw-modal  tw-bg-black tw-bg-opacity-60"
  >
    <form method="dialog" className="tw-modal-box tw-w-11/12 tw-max-w-5xl">
      <h3 className="tw-font-bold tw-text-lg  tw-mb-5">create merge request</h3>

      <LabInput v-model="project" label="Project" autofocus />
      <LabInput v-model="targetBranch" label="target branch" />
      <LabInput v-model="sourceBranch" label="source branch" />

      <select className="tw-select tw-w-full tw-max-w-xs" placeholder="select ">
        <option value="" disabled>请选择</option>
        <option value="Homer">Homer</option>
        <option value="Marge">Marge</option>
        <option value="Bart">Bart</option>
        <option value="Lisa">Lisa</option>
        <option value="Maggie">Maggie</option>
      </select>

      <div className="tw-modal-action">
        <button type="button" className="btn" @click="handleCancel">
          cancel
        </button>
        <button type="submit" className="btn btn-success">confirm</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  color: rgb(46, 46, 46);
}
</style>
