import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const root = document.querySelector("body>header .navbar-collapse.collapse>ul");
if (root) {
  createApp(App).mount(
    (() => {
      const app = document.createElement("li");
      app.classList.add("nav-item", "header-user", "dropdown");
      root.append(app);
      return app;
    })(),
  );
}
