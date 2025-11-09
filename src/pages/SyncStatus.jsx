//  const mockSyncStatus = { lastSync: "2 hours ago", status: "pending" };

import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Clock1, BarChart } from "lucide-react";

const SyncStatus = () => {
  // State for the cards
  const [totalEntries, setTotalEntries] = useState(50);
  const [syncedEntries, setSyncedEntries] = useState(35);
  const [pendingEntries, setPendingEntries] = useState(15);
  const [lastSync, setLastSync] = useState("06 Nov 2025 - 12:02PM");

  // State for syncing
  const [isSyncing, setIsSyncing] = useState(false);

  // Mock sync history
  const [syncHistory, setSyncHistory] = useState([
    { date: "06 Nov 2025 - 12:02PM", records: 8 },
    { date: "07 Nov 2025 - 09:40AM", records: 3 },
  ]);

  const handleSyncNow = () => {
    setIsSyncing(true);

    // Mock async sync
    setTimeout(() => {
      const newRecordsSynced = Math.floor(Math.random() * 5) + 1; // 1–5 records
      setSyncedEntries((prev) => prev + newRecordsSynced);
      setPendingEntries((prev) => Math.max(0, prev - newRecordsSynced));
      const now = new Date();
      const formattedNow = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastSync(formattedNow);
      setSyncHistory([
        { date: formattedNow, records: newRecordsSynced },
        ...syncHistory,
      ]);
      setIsSyncing(false);
    }, 2000); // 2 seconds to simulate syncing
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Sync Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Entries</p>
            <p className="text-xl font-bold">{totalEntries}</p>
          </div>
          <BarChart className="text-blue-500 w-8 h-8" />
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Synced Entries</p>
            <p className="text-xl font-bold">{syncedEntries}</p>
          </div>
          <CheckCircle className="text-green-500 w-8 h-8" />
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Pending Entries</p>
            <p className="text-xl font-bold">{pendingEntries}</p>
          </div>
          <Clock className="text-yellow-500 w-8 h-8" />
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500">Last Sync</p>
            <p className="text-xl font-bold">{lastSync}</p>
          </div>
          <Clock1 className="text-purple-500 w-8 h-8" />
        </div>
      </div>

      {/* Sync History */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-6">
          {" "}
          <h3 className="text-xl font-semibold mb-2">Sync History</h3>
          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              isSyncing
                ? "bg-gray-400 cursor-not-allowed animate-pulse"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isSyncing ? "Syncing..." : "Sync Now"}
          </button>
        </div>
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {syncHistory.map((item, index) => (
            <li key={index} className="p-4 flex justify-between">
              <span>{item.date}</span>
              <span>
                {item.records} record{item.records > 1 ? "s" : ""} synced
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sync Now Button */}
    </div>
  );
};

export default SyncStatus;
