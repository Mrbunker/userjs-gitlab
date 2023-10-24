<script setup lang="ts">
import { InputHTMLAttributes } from "vue";

// !todo https://github.com/vuejs/core/issues/8286
interface Props extends /** @vue-ignore */ InputHTMLAttributes {
  title: string;
  modelValue: string;
  extra?: string;
}
defineProps<Props>();

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
    <div class="tw-text-info-content">{{ extra }}</div>
    <slot />
  </div>
</template>
