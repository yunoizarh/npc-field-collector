import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import updateSW from "./registerServiceWorker.js";
import { syncOfflineEntries } from "./syncOffline.js"; // ✅ import your sync logic

// Render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);

// ✅ After app is mounted
updateSW();

// ✅ Handle offline → online sync
window.addEventListener("online", () => {
  console.log("✅ Back online — syncing entries...");
  syncOfflineEntries();
});

// ✅ Optionally sync on startup if online
if (navigator.onLine) {
  console.log("🌐 Online at startup — syncing entries...");
  syncOfflineEntries();
}
