import { createApp } from "vue";
import { router } from "./plugins/router";
import { Themer } from "./plugins/theme";

import App from "./App.vue";
import "./assets/styles.css";

Themer.update();
createApp(App).use(router).mount("#app");
