<script setup lang="ts">
defineProps<{
  autofocus?: boolean;
  title: string;
  modelValue: string;
  placeholder?: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ title }}</span>
    </label>
    <input
      class="form-control input-lg"
      :autofocus="autofocus"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
