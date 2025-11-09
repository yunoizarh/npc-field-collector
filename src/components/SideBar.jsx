import React from "react";
import {
  ListPlus,
  Files,
  MapPinPen,
  RefreshCcw,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react";
import npcLogo2 from "../assets/npc-logo2.webp";
import npcLogo3 from "../assets/npc-logo3.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeSection,
  setActiveSection,
  mockSyncStatus,
}) => {
  const navigate = useNavigate();
  const navItems = [
    { id: "add-entry", label: "Add Entry", icon: <ListPlus /> },
    { id: "my-records", label: "My Records", icon: <Files /> },
    { id: "map-view", label: "Map View", icon: <MapPinPen /> },
    { id: "sync-status", label: "Sync Status", icon: <RefreshCcw /> },
  ];

  // Logic to handle navigation click (closes sidebar on mobile)
  const handleNavClick = (id) => {
    setActiveSection(id);
    if (window.innerWidth < 768) {
      // md breakpoint is 768px by default
      setIsSidebarOpen(false);
    }
  };

  const { signOutUser } = useAuth();
  const handleSignOut = async () => {
    const { success, error } = await signOutUser();
    if (success) {
      navigate("/signin");
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {/* 1. Sidebar (Desktop & Mobile) */}
      <div
        className={`fixed md:relative top-0 left-0 h-full bg-white shadow-lg z-30
            transform transition-all duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full md:translate-x-0 md:w-20" // <-- Desktop collapsed width
            }
            flex flex-col flex-shrink-0
        `}
      >
        {/* Header (Logo and Collapse Button) */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16">
          <div
            className={`flex items-center space-x-2 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            <img src={npcLogo2} alt="npc logo" />
          </div>

          {/* Collapse/Expand Button (Desktop Only) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={` rounded-lg hover:bg-gray-100 hidden md:block ${
              !isSidebarOpen ? "ml-auto" : ""
            }`}
            aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronsLeft className="w-6 h-6" />
            ) : (
              <div className="flex items-center">
                <img src={npcLogo3} alt="npc logo" className="size-10" />
                <ChevronsRight className="size-16" />
              </div>
            )}
          </button>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 md:hidden ml-auto"
            aria-label="Close Sidebar"
          >
            {/* Using an X icon for closing mobile menu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200
                ${
                  activeSection === item.id
                    ? "bg-blue-50 text-green-700 border-r-4 border-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }
                ${!isSidebarOpen ? "justify-center" : "space-x-3"}
                `}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sync Status */}
        <div
          className={`px-4 pb-24 ${
            !isSidebarOpen ? "flex justify-center" : ""
          }`}
        >
          <div
            className={`flex items-center p-3 text-sm rounded-lg w-full ${
              !isSidebarOpen ? "w-12 h-12 justify-center" : "space-x-3"
            }
              ${
                mockSyncStatus.status === "synced"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }
            `}
          >
            <RefreshCcw className="w-5 h-5" />
            {isSidebarOpen && (
              <div className="ml-3">
                <div className="font-medium">Sync {mockSyncStatus.status}</div>
                <div className="text-xs">Last: {mockSyncStatus.lastSync}</div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          className={`absolute bottom-4 left-0 right-0 mx-4 flex items-center px-4 py-3 
            text-red-500 hover:bg-gray-50 rounded-lg transition-colors duration-200
            ${!isSidebarOpen ? "justify-center" : "space-x-3"}
            `}
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>

      {/* 2. Mobile Overlay (Clicking this closes the mobile menu) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
