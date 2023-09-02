<script setup lang="ts">
defineProps<{ autofocus?: boolean; label: string; modelValue: string }>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ label }}</span>
    </label>
    <!-- placeholder="My awesome project" -->
    <input
      class="form-control input-lg"
      :autofocus="autofocus"
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
