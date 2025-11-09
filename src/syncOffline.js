// src/syncOffline.js
import { getAllLocalEntries, removeLocalEntry } from "./offlineStoreDb";

export async function syncOfflineEntries() {
  const entries = await getAllLocalEntries();
  for (const e of entries) {
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if (res.ok) {
        await removeLocalEntry(e.localId);
      } else {
        // server rejected it — maybe fix formatting or wait
        console.warn("Server rejected entry", e.localId);
      }
    } catch (err) {
      // still offline or network error — stop trying for now
      console.warn("Sync failed, will retry later", err);
      return;
    }
  }
}
