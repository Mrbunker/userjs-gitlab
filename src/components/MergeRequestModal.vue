<script setup lang="ts">
import LabInput from "./LabInput.vue";

const { handleClose } = defineProps<{
  open: boolean;
  handleClose: () => void;
}>();

const handleConfirm = (event: Event) => {};
</script>

<template>
  <dialog
    :open="open"
    @submit="handleConfirm"
    className="tw-modal  tw-bg-black tw-bg-opacity-60"
  >
    <form method="dialog" className="tw-modal-box tw-w-11/12 tw-max-w-5xl">
      <h3 className="tw-font-bold tw-text-lg  tw-mb-5">create merge request</h3>

      <LabInput label="Project" autofocus />
      <LabInput label="target branch" />
      <LabInput label="source branch" />

      <div className="tw-modal-action">
        <button className="btn" @click="handleClose">Close</button>
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
