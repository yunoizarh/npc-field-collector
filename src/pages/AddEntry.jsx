import React, { useState } from "react";
import { MapPin, Upload } from "lucide-react";

const AddEntry = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    address: "",
    occupation: "",
    maritalStatus: "",
    householdSize: "",
    gpsLocation: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Get current GPS coordinates
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          gpsLocation: `${latitude}, ${longitude}`,
        }));
      },
      () => alert("Unable to retrieve your location")
    );
  };

  const handleSaveOffline = (e) => {
    e.preventDefault();
    console.log("Saved offline:", formData);
    alert("Household record saved offline!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8 overflow-y-hidden">
      <div
        className="
          bg-white shadow-lg rounded-2xl 
          w-full 
          p-6 
         
          md:max-w-none
        "
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Add New Household Record
        </h2>

        <form
          onSubmit={handleSaveOffline}
          className="space-y-4 md:grid md:grid-cols-2 md:gap-6"
        >
          {/* Full Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Age"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex justify-between mt-1">
              {["M", "F", "Other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center space-x-1 text-gray-600"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    required
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter occupation"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {/* Household Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Household Size
            </label>
            <input
              type="number"
              name="householdSize"
              value={formData.householdSize}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Number of people"
              required
            />
          </div>

          {/* GPS Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GPS Location
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="gpsLocation"
                value={formData.gpsLocation}
                onChange={handleChange}
                className="mt-1 flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                placeholder="Auto-filled"
                readOnly
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="mt-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <MapPin size={18} />
              </button>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Photo Upload (optional)
            </label>
            <label className="mt-1 flex items-center justify-center w-full border-2 border-dashed rounded-lg py-3 cursor-pointer hover:bg-gray-50">
              <Upload size={18} className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm">
                {formData.photo ? formData.photo.name : "Choose file"}
              </span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Save Offline Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Save Offline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;
