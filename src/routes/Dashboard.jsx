import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import AddEntry from "../pages/AddEntry";
import MyRecords from "../pages/MyRecords";
import MapView from "../pages/MapView";
import SyncStatus from "../pages/SyncStatus";
import { RefreshCcw } from "lucide-react";
const mockUser = { name: "John Doe" };
const mockSyncStatus = { lastSync: "2 hours ago", status: "pending" };

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("add-entry");

  const renderPageContent = () => {
    switch (activeSection) {
      case "add-entry":
        return <AddEntry />;

      case "my-records":
        return <MyRecords />;

      case "map-view":
        return <MapView />;

      case "sync-status":
        return <SyncStatus />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mockSyncStatus={mockSyncStatus}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out `}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                aria-label="Toggle Sidebar"
              >
                ☰
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome, {mockUser.name}
              </h1>
            </div>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              <span>
                <RefreshCcw />
              </span>
              <span className="hidden sm:block">Sync Now</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto">{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
