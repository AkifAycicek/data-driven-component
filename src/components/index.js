import app from "@/app.js";

import BsInput from "@/components/BsInput.vue";
import BsSelect from "@/components/BsSelect.vue";
import BsCheckbox from "@/components/BsCheckbox.vue";
import BsTextarea from "@/components/BsTextarea.vue";
import BsModal from "@/components/BsModal.vue";
import BsDatetime from "@/components/BsDatetime.vue";
import BsInputgroup from "@/components/BsInputgroup.vue";
import DataDrivenForm from "@/components/DataDrivenForm.vue";

app.component("BsInput", BsInput);
app.component("BsSelect", BsSelect);
app.component("BsCheckbox", BsCheckbox);
app.component("BsTextarea", BsTextarea);
app.component("BsModal", BsModal);
app.component("BsDatetime", BsDatetime);
app.component("BsInputgroup", BsInputgroup);
app.component("DataDrivenForm", DataDrivenForm);
