import React, { useState, useEffect } from "react";
import {
  ListPlus,
  Files,
  MapPinPen,
  RefreshCcw,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
const mockUser = { name: "John Doe" };
const mockSyncStatus = { lastSync: "2 hours ago", status: "pending" };

// Sidebar Navigation Items
const navItems = [
  { id: "add-entry", label: "Add Entry", icon: <ListPlus /> },
  { id: "my-records", label: "My Records", icon: <Files /> },
  { id: "map-view", label: "Map View", icon: <MapPinPen /> },
  { id: "sync-status", label: "Sync Status", icon: <RefreshCcw /> },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("add-entry");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Content components
  const renderContent = () => {
    switch (activeSection) {
      case "add-entry":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Entry</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit Entry
                </button>
              </form>
            </div>
          </div>
        );

      case "my-records":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Records</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">1</td>
                    <td>Sample Record</td>
                    <td>2024-01-15</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">2</td>
                    <td>Another Record</td>
                    <td>2024-01-16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "map-view":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Map View</h2>
            <div className="bg-white rounded-lg shadow p-6 h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Map visualization would go here</p>
            </div>
          </div>
        );

      case "sync-status":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Sync Status</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Last Sync:</span>
                  <span className="font-medium">{mockSyncStatus.lastSync}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      mockSyncStatus.status === "synced"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {mockSyncStatus.status}
                  </span>
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                    Force Sync Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
        bg-white shadow-lg transition-all duration-300 ease-in-out z-20
        ${isSidebarOpen ? "w-64" : "w-20"}
        ${isMobile && !isSidebarOpen ? "hidden" : "fixed md:relative"}
        h-full
      `}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  NPC
                </div>
                <span className="font-semibold text-lg">NPC System</span>
              </div>
            )}
            {!isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
              </button>
            )}
          </div>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center px-4 py-3 text-left transition-colors duration-200
                ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sync Status in Sidebar */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <div
            className={`
            flex items-center px-4 py-3 text-sm
            ${
              mockSyncStatus.status === "synced"
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            } rounded-lg
          `}
          >
            <span className="text-lg">🔄</span>
            {isSidebarOpen && (
              <div className="ml-3">
                <div className="font-medium">Sync {mockSyncStatus.status}</div>
                <div className="text-xs">Last: {mockSyncStatus.lastSync}</div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          className={`
          absolute bottom-4 left-0 right-0 mx-4 flex items-center px-4 py-3 
          text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200
        `}
        >
          <span className="text-lg">🚪</span>
          {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`
        flex-1 flex flex-col transition-all duration-300 ease-in-out
        ${isSidebarOpen && !isMobile ? "md:ml-0" : "ml-0"}
      `}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  ☰
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome, {mockUser.name}
              </h1>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <span>🔄</span>
              <span>Sync Now</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
