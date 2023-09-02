<script setup lang="ts">
defineProps<{ autofocus?: boolean; label: string }>();
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ label }}</span>
    </label>
    <input
      placeholder="My awesome project"
      class="form-control input-lg"
      :autofocus="autofocus"
      type="text"
    />
  </div>
</template>
