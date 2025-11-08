import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MapPin } from "lucide-react";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

const MyRecords = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const records = [
    {
      id: 1,
      name: "John",
      age: 35,
      gender: "M",
      status: "Pending",
      location: "Lagos",
      date: "2025-11-01",
    },
    {
      id: 2,
      name: "Mary",
      age: 28,
      gender: "F",
      status: "Synced",
      location: "Abuja",
      date: "2025-11-03",
    },
    {
      id: 3,
      name: "Alice",
      age: 32,
      gender: "F",
      status: "Pending",
      location: "Kano",
      date: "2025-11-02",
    },
    {
      id: 4,
      name: "David",
      age: 40,
      gender: "M",
      status: "Synced",
      location: "Port Harcourt",
      date: "2025-11-05",
    },
    {
      id: 5,
      name: "Eve",
      age: 29,
      gender: "F",
      status: "Pending",
      location: "Ibadan",
      date: "2025-11-04",
    },
  ];

  // Filter by status and search term
  const filteredRecords = records.filter(
    (record) =>
      (filterStatus === "All" || record.status === filterStatus) &&
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status with emoji
  const statusTemplate = (rowData) =>
    rowData.status === "Synced" ? "✅ Synced" : "🟠 Pending";

  // Actions buttons
  const actionsTemplate = (rowData) =>
    rowData.status === "Synced" ? (
      <Button
        icon="pi pi-eye"
        label="View"
        className="p-button-text p-button-sm "
      />
    ) : (
      <Button
        icon="pi pi-pencil"
        label="Edit"
        className="p-button-text p-button-sm"
      />
    );

  // Location icon as button
  const locationTemplate = (rowData) => (
    <button
      className="flex items-center gap-1 text-blue-500 hover:underline"
      onClick={() => alert(`Open map for ${rowData.location}`)}
    >
      <MapPin size={16} />
      {rowData.location}
    </button>
  );

  // Row style based on status
  const rowClassName = (rowData) =>
    rowData.status === "Pending"
      ? "bg-orange-50 "
      : rowData.status === "Synced"
      ? "bg-green-50"
      : "";

  return (
    <div className="p-4 md:p-6 lg:p-8 ">
      <h2 className="text-xl font-bold mb-4">My Records</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Pending", "Synced"].map((status) => (
          <button
            key={status}
            className={`px-4 py-1 rounded-md font-medium ${
              filterStatus === status
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DataTable */}
      <DataTable
        value={filteredRecords}
        paginator
        rows={5}
        sortMode="multiple"
        responsiveLayout="scroll"
        rowClassName={rowClassName}
      >
        <Column field="name" header="Name" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="gender" header="Gender" />
        <Column header="Status" body={statusTemplate} />
        <Column header="Location" body={locationTemplate} />
        <Column field="date" header="Date" sortable />
        <Column header="Actions" body={actionsTemplate} />
      </DataTable>

      {/* Footer summary */}
      <div className="mt-4 text-gray-700 font-medium">
        Total Records: {filteredRecords.length} | Pending:{" "}
        {filteredRecords.filter((r) => r.status === "Pending").length} | Synced:{" "}
        {filteredRecords.filter((r) => r.status === "Synced").length}
      </div>
    </div>
  );
};

export default MyRecords;
