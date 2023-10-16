<script setup lang="ts">
defineProps<{
  title: string;
  modelValue: string;
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
      type="text"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="form-control input-lg"
      v-bind="$attrs"
    />
  </div>
</template>
