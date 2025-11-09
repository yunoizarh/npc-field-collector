// src/registerServiceWorker.js
import { registerSW } from "virtual:pwa-register"; // provided by the plugin

const updateSW = registerSW({
  onRegistered(r) {
    console.log("Service Worker registered:", r);
  },
  onNeedRefresh() {
    // show UI to prompt user to refresh
    console.log("New content available — please refresh.");
  },
  onOfflineReady() {
    console.log("App ready to work offline.");
  },
});

export default updateSW;
