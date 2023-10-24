import { createApp } from "vue";
import HelperApp from "./HelperApp.vue";
import "./style.css";

const helperRoot = document.querySelector(
  "body>header .navbar-collapse.collapse>ul"
);
if (helperRoot) {
  createApp(HelperApp).mount(
    (() => {
      const app = document.createElement("li");
      app.classList.add("nav-item", "header-user", "dropdown");
      helperRoot.append(app);
      return app;
    })()
  );
}
