<script setup lang="ts">
defineProps<{
  autofocus?: boolean;
  title: string;
  modelValue: string;
  placeholder?: string;
  list?: string;
  disabled?: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ title }}</span>
    </label>
    <input
      :value="modelValue"
      :disabled="disabled"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :list="list"
      type="text"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="form-control input-lg"
    />
  </div>
</template>
