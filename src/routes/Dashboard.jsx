import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import AddEntry from "../pages/AddEntry";
import MyRecords from "../pages/MyRecords";
import MapView from "../pages/MapView";
import SyncStatus from "../pages/SyncStatus";
import { RefreshCcw } from "lucide-react";
import npcLogo3 from "../assets/npc-logo3.png";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const mockUser = { name: "Maimunah" };
const mockSyncStatus = { lastSync: "2 hours ago", status: "pending" };

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("add-entry");
  const { isOnline } = useAuth();

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
          <div className="flex items-center justify-between sm:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden flex items-center"
                aria-label="Toggle Sidebar"
              >
                <img src={npcLogo3} alt="" className="size-12" />
                <Menu />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome, {mockUser.name}
              </h1>
            </div>
            {isOnline ? (
              <span className="text-green-600">✅ Online</span>
            ) : (
              <span className="text-yellow-500">📴 Offline Mode</span>
            )}
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              <span>
                <RefreshCcw />
              </span>
              <span className="hidden sm:block ">Sync Now</span>
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
