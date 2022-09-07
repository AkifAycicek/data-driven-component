<template>
  <Teleport to="body">
    <div
      :id="modalId"
      :ref="(el) => initModal(el)"
      class="modal fade"
      :class="state.classList"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-text="modalTitle" />
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="modalBody" />
          </div>
          <div v-if="$slots.modalFooter" class="modal-footer">
            <slot name="modalFooter" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { reactive, watch, computed, onMounted } from "vue";

const emitter = defineEmits(["initInstance", "close"]);
const props = defineProps({
  modalId: {
    type: String,
    default: "_" + Math.random().toString(16).substring(2, 10),
  },
  size: {
    type: String,
    default: "lg",
  },
  modalTitle: {
    type: String,
    default: "Modal Title",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  modalInstance: null,
  classList: computed(() => ({
    [`modal-${props.size}`]: props.size,
  })),
});

onMounted(() => {
  watch(
    () => props.modelValue,
    (show) => {
      if (show == true) {
        return state.modalInstance.show();
      }
      state.modalInstance.hide();
    },
    { immediate: true }
  );
});

function initModal(element) {
  state.modalInstance = Modal.getOrCreateInstance(element);

  element.addEventListener("hidden.bs.modal", () => {
    emitter("close");
    emitter("update:modelValue", false);
  });

  emitter("initInstance", state.modalInstance);
}
</script>
