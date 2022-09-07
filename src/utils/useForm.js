import { reactive } from "vue";
import { isObject } from "@vue/shared";
import Validator from "validatorjs";
import Errors from "validatorjs/src/errors";
import en from "validatorjs/src/lang/en";

Validator.setMessages("en", en);

/** *
 * @param {Object} attributes form values.
 * @param {Object} rules form rules.
 */
export default (attributes = {}, rules = {}) => {
  const getValue = (attribute, searchkey = "value") => {
    if (isObject(attribute)) {
      if (attribute[searchkey] !== undefined) {
        return getValue(attribute[searchkey]);
      }
      return Object.entries(attribute).reduce((acc, [key, value]) => {
        acc[key] = getValue(value);
        return acc;
      }, {});
    }
    return attribute;
  };

  const state = reactive({
    ...getValue(attributes),
    rules: rules,
    errors: new Errors(),
    defaults: attributes,
    fails: () => false,
    isValid: () => {
      try {
        const values = state.getAttributes();
        const validation = new Validator(values, state.rules);
        state.errors = validation.errors;
        validation.setAttributeFormatter(() => {
          return "";
        });
        state.fails = validation.fails;
        return validation.passes();
      } catch (error) {
        console.info(error);
        throw error;
      }
    },
    getAttributes: () => {
      const stateFormValues = Object.entries(state)
        .filter(([key]) => Object.keys(attributes).includes(key))
        .reduce((acc, [key, value]) => {
          acc[key] = getValue(value);
          return acc;
        }, {});
      return stateFormValues;
    },
    reset(attributes = state.defaults) {
      Object.keys(attributes).forEach((key) => {
        state[key] = attributes[key];
      });
      state.errors = new Errors();
    },
  });

  return state;
};
