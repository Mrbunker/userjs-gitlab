<script setup lang="ts">
defineProps<{
  modelValue: string;
  title: string;
  options: any[];
  valueKey: string;
  labelKey: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group">
    <label class="label-bold"
      ><span>{{ title }}</span>
    </label>
    <select
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="tw-select tw-w-full tw-max-w-xs tw-block"
      v-bind="$attrs"
    >
      <!-- <option value="" disabled selected>
        select {{ title.toLocaleLowerCase() }}：
      </option> -->
      <option v-for="item in options" :value="item[valueKey]">
        {{ item[labelKey] }}
      </option>
    </select>
  </div>
</template>
