<template>
  <div
    class="mb-3"
    :class="{ ['form-check']: state.inputTypes[type] == 'BsCheckbox' }"
  >
    <label class="form-label mx-2" :for="state.id" v-text="label" />
    <component
      :is="state.inputTypes[type] || type"
      :id="state.id"
      v-model="state.inputVal"
      v-bind="$attrs"
    />
    <small v-if="error" class="text-danger" v-text="error" />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
const emitter = defineEmits([]);
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: String,
    default: null,
  },

  // its might be an issue if outsource components have label prop but I'm too lazy to change it
  label: {
    type: String,
    default: null,
  },
});

const state = reactive({
  id: "_" + Math.random().toString(16).substring(2, 10),

  // using `computed` instead of @change/@input + :value because avoid to attr inheritance conflicts
  inputVal: computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emitter("update:modelValue", value);
    },
  }),
  inputTypes: {
    calendar: "BsDatetime",
    textbox: "BsInput",
    text: "BsTextarea",
    checkbox: "BsCheckbox",
    smart_ddl: "BsSelect",
  },
});
</script>

<style></style>
