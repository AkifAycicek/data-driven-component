<template>
  <select
    :value="modelValue"
    class="form-control"
    @change="$emit('update:modelValue', $event.target.value)"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="item in items"
      :key="`item_${item.id || i}`"
      :value="item[valueKey]"
      v-text="item[labelKey]"
    />
  </select>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  items: {
    type: Array,
    default: [],
  },
  valueKey: {
    type: String,
    default: "id",
  },
  labelKey: {
    type: String,
    default: "name",
  },
});
</script>

<style></style>
