<template>
  <div class="row align-items-center">
    <div
      v-for="field in fields"
      :key="`${fieldPrefix}${field.id}`"
      :class="[`col-sm-${field.css_style}`]"
    >
      <BsInputgroup
        v-model:modelValue="state.form[`${fieldPrefix}${field.id}`]"
        :type="field.input_type"
        :placeholder="field.place_holder"
        :items="field.smart_ddl_items"
        :label="field.name"
        :error="state.form.errors.first(`${fieldPrefix}${field.id}`)"
        :title="field.description"
      />
    </div>
    <div v-if="actions.length > 0" class="col-12">
      <div class="text-end">
        <button
          v-for="(action, i) in actions"
          :key="'form_action_' + i"
          class="btn"
          :class="action.className"
          :disabled="action.disabled"
          @click="action.onclick"
          v-text="action.text"
        />
      </div>
    </div>
    <!-- You can view form values
    <pre>{{ state.form }}</pre> -->
  </div>
</template>

<script setup>
import useForm from "@/utils/useForm.js";
import { reactive, watch } from "vue";
const emitter = defineEmits(["initForm"]);
const props = defineProps({
  fields: {
    type: [Object, Array],
    default: [],
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  actions: {
    type: Array,
    default: null,
  },
  fieldPrefix: {
    type: String,
    default: "cf_",
  },
});

const state = reactive({
  form: null,
  inputTypes: {
    smart_ddl: { component: "select" },
  },
});

watch(
  () => props.modelValue,
  () => {
    state.form = useForm(
      // form values, {prefix_id1: null, prefix_id1: 'foo'...}
      props.fields.reduce((acc, field) => {
        acc[`${props.fieldPrefix}${field.id}`] =
          props.modelValue[`${props.fieldPrefix}${field.id}`] || null;
        return acc;
      }, {}),

      // form rules, {prefix_id1: 'required', prefix_id2: 'required|email|min:3'...}
      props.fields.reduce((acc, field) => {
        if (field.is_required || field.input_validator) {
          acc[`${props.fieldPrefix}${field.id}`] = [
            field.is_required && "required",

            // checkout for more valiator https://github.com/mikeerickson/validatorjs
            field.input_validator,
          ]
            .filter(Boolean)
            .join("|");
        }
        return acc;
      }, {})
    );
    emitter("initForm", state.form);
  },
  { immediate: true }
);
</script>
