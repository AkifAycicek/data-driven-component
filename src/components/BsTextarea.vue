<template>
  <textarea
    :value="modelValue"
    class="form-control"
    @change="$emit('update:modelValue', $event.target.value)"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});
</script>

<style></style>
