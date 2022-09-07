<template>
  <input
    :checked="modelValue"
    class="form-control form-check-input"
    type="checkbox"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: null,
  },
});
</script>

<style></style>
