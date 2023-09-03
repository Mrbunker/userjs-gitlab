<script setup lang="ts">
defineProps<{
  title: string;
  options: any[];
  valueKey: string;
  labelKey: string;
}>();
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ title }}</span>
    </label>
    <select class="tw-select tw-w-full tw-max-w-xs tw-block">
      <!-- <option value="" disabled selected>
        select {{ title.toLocaleLowerCase() }}：
      </option> -->
      <option v-for="item in options" :value="item[valueKey]">
        {{ item[labelKey] }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
