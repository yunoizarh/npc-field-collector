// src/offlineStore.js
import { openDB } from "idb";

const DB_NAME = "collector-db";
const STORE = "entries";

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, {
          keyPath: "localId",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function saveEntryLocally(entry) {
  const db = await getDb();
  await db.add(STORE, { ...entry, createdAt: Date.now(), synced: false });
}

export async function getAllLocalEntries() {
  const db = await getDb();
  return db.getAll(STORE);
}

export async function removeLocalEntry(localId) {
  const db = await getDb();
  return db.delete(STORE, localId);
}
