import React, { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  CloudOff,
  RefreshCw,
  MonitorCheck,
  Smartphone, // Icon for Phone Mockup
  Monitor, // Icon for Laptop Mockup
  MapPin,
  ListChecks,
  AreaChart,
} from "lucide-react";

// --- Device Mockup Components ---

const PhoneMockup = () => (
  <div className="flex flex-col items-center">
    <Smartphone className="h-10 w-10 text-green-600 mb-3" />
    <p className="text-lg font-semibold text-gray-700 mb-4">
      Enumerator App (Mobile)
    </p>

    {/* Phone Frame */}
    <div className="w-56 h-96 border-[10px] border-gray-800 rounded-[2.5rem] p-1 shadow-2xl bg-gray-900 relative">
      {/* Notch/Speaker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-b-lg"></div>

      {/* Screen Content */}
      <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3 bg-green-600 text-white flex justify-between items-center">
          <span className="font-semibold">Household Census</span>
          <ListChecks className="h-5 w-5" />
        </div>
        {/* Body */}
        <div className="p-4 flex-grow space-y-3">
          <div className="text-sm font-medium text-gray-800">
            1. Head of Household Name:
          </div>
          <div className="h-6 bg-gray-100 rounded"></div>

          <div className="text-sm font-medium text-gray-800">
            2. Total Members:
          </div>
          <div className="h-6 w-1/2 bg-gray-100 rounded"></div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-4">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-red-500" /> GPS Locked
            </span>
            <span className="text-green-600 font-semibold">Offline Mode</span>
          </div>
        </div>
        {/* Footer CTA */}
        <div className="p-3 bg-gray-50">
          <button className="w-full py-2 text-white bg-green-500 rounded-lg text-sm font-semibold">
            Submit & Next
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LaptopMockup = () => (
  <div className="flex flex-col items-center">
    <Monitor className="h-10 w-10 text-green-600 mb-3" />
    <p className="text-lg font-semibold text-gray-700 mb-4">
      Admin Dashboard (Desktop)
    </p>

    {/* Laptop Frame */}
    <div className="w-full max-w-xl h-64 border-[8px] border-gray-800 rounded-xl p-1 shadow-2xl bg-gray-900 relative">
      {/* Screen Content */}
      <div className="w-full h-full rounded-lg bg-white overflow-hidden flex flex-col">
        {/* Header Dashboard */}
        <div className="p-3 bg-gray-800 text-white flex justify-between items-center text-sm">
          <span className="font-semibold">Real-time Overview</span>
          <span className="text-green-400 flex items-center">
            <AreaChart className="h-4 w-4 mr-1" /> 98% Completion
          </span>
        </div>
        {/* Body Content */}
        <div className="p-4 grid grid-cols-2 gap-4 flex-grow">
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-lg p-3 text-center text-xs text-gray-500 flex flex-col justify-center items-center">
            <MapPin className="h-5 w-5 mb-1 text-gray-400" />
            Live Enumerator Tracking Map
          </div>
          {/* Charts Placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-green-200 rounded-full w-4/5"></div>
            <div className="h-4 bg-yellow-200 rounded-full w-full"></div>
            <div className="h-4 bg-red-200 rounded-full w-3/5"></div>
            <div className="text-xs text-gray-600 mt-2">
              Data Aggregation Charts
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Keyboard/Base */}
    <div className="w-3/4 h-3 bg-gray-700 rounded-b-lg"></div>
  </div>
);

// --- Demo Section Component ---
const DemoSection = () => {
  return (
    <>
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              See Our Solution in Action
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              From the field enumerator to the central planning
              administrator—seamless and synchronized.
            </p>
          </div>

          {/* Side-by-Side Mockup Grid */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 flex justify-center">
              <PhoneMockup />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <LaptopMockup />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to Transform Your Data Collection?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start collecting accurate, real-time data from the field today. No
            internet? No problem.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-xl text-white bg-green-600 shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default DemoSection;
