<script setup lang="ts">
defineProps({
  dialogId: String,
  modalTitle: String,
  confirmDisabled: Boolean,
});
const emit = defineEmits(["cancel", "confirm"]);
</script>

<template>
  <dialog :id="dialogId" @submit="emit('confirm')" class="tw-modal">
    <form method="dialog" class="tw-modal-box tw-w-6/12 tw-max-w-5xl">
      <h3 class="tw-font-bold tw-text-lg tw-mb-5">{{ modalTitle }}</h3>
      <slot></slot>
      <div class="tw-modal-action">
        <button type="button" class="btn" @click="emit('cancel')">
          cancel
        </button>
        <button
          type="submit"
          class="btn btn-success"
          :disabled="confirmDisabled"
        >
          confirm
        </button>
      </div>
    </form>
  </dialog>
</template>
