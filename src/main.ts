import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import "@quasar/extras/material-icons/material-icons.css"; // Import icon libraries
import "quasar/src/css/index.sass"; // Import Quasar css

const blackjackApp = createApp(App);
const pinia = createPinia();

blackjackApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
blackjackApp.use(pinia);

blackjackApp.mount("#app");
