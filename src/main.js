import app from "@/app.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import router from "@/router";
import axios from "axios";
import "@/components";

axios.defaults.baseURL = "http://localhost:3000/";

app.use(router).mount("#app");
