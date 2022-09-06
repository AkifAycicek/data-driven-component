import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/js/bootstrap.bundle.min";
import router from "@/router";

const app = createApp(App);

app.use(router).mount("#app");
