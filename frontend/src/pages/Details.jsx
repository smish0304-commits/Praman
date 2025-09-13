import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../assets/map.png";
import photo from "../assets/man.jpg";
import ss1 from "../assets/ss1.png";
import ss2 from "../assets/ss2.png";
import ss3 from "../assets/ss3.png";
import ss4 from "../assets/ss4.png";
import {
  FaTractor,
  FaTruck,
  FaVial,
  FaWarehouse,
  FaStore,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

const supplyChainData = [
  {
    role: "Farmer",
    location: "Bhubaneswar, Odisha",
    description: "Herbs carefully harvested and quality-checked on site.",
    date: "2024-01-15",
    time: "08:30 AM",
    icon: FaTractor,
    borderColor: "border-green-500",
    companyName: "rajesh.kumar@ayurvedic-farm.in",
    supervisor: "Rajesh Kumar",
    pramanId: "FRM002",
    batchId: "FARM-0001-23",
    // farmerPhoto: photo,
    locationPhoto: Map, // Location photo for Farmer
    loggedPictures: [
      ss1, // Example of logged picture URLs
      ss2,
      ss3,
      ss4,
    ],
  },
  {
    role: "Collector",
    location: "Bhubaneswar, Odisha",
    description: "Collected and consolidated herbs at the local storage facility.",
    date: "2024-01-15",
    time: "10:30 AM",
    icon: FaTruck,
    borderColor: "border-blue-500",
    companyName: "Balangir Herb Collectors Ltd",
    supervisor: "Sunita Das",
    pramanId: "COL001",
    batchId: "FARM-0001-23",  
},
  {
    role: "Lab",
    location: "ABC Testing Lab, Bhubaneswar",
    description: "Rigorous lab testing for purity and potency.",
    date: "2024-01-15",
    time: "02:15 PM",
    icon: FaVial,
    borderColor: "border-purple-500",
    companyName: "ABC Testing Lab Pvt Ltd",
    supervisor: "Dr. Priya Mishra",
    pramanId: "LAB001",
     batchId: "FARM-0001-23",
  },
  {
    role: "Distributor",
    location: "Hub Warehouse, Bhubaneswar",
    description: "Packaged and sealed products prepared for shipment.",
    date: "2024-01-17",
    time: "04:00 PM",
    icon: FaWarehouse,
    borderColor: "border-yellow-500",
    companyName: "Bhubaneswar Distributors Inc",
    supervisor: "Arun Singh",
    pramanId: "DIS001",
     batchId: "FARM-0001-23",
  },
  {
    role: "Retailer",
    location: "Bhubaneswar Outlet",
    description: "Final product received, inspected, and stocked on shelves.",
    date: "2024-01-18",
    time: "11:45 AM",
    icon: FaStore,
    borderColor: "border-pink-500",
    companyName: "Bhubaneswar Retailers Co.",
    supervisor: "Manisha Patnaik",
    pramanId: "RET007",
    batchId: "FARM-0001-23",
  },
];

const Details = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const navigate = useNavigate();

  const handleFarmerClick = (farmer) => {
    setSelectedFarmer(farmer);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedFarmer(null);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow px-4 py-10 max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Product Journey Timeline</h1>
            <p className="text-blue-700 text-2xl font-bold">Batch: FRM001-1757732480816-GEN</p>
            <p className="text-gray-600 text-lg font-bold">Tracking for Aswagandha</p>
          </div>

          {/* Timeline */}
          <div className="relative pl-12">
            {/* Glowing Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-blue-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full"></div>

            {supplyChainData.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative mb-10 flex items-start group">
                  {/* Icon */}
                  <div className="absolute left-0 top-1 z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 shadow-md cursor-pointer"
                      onClick={step.role === "Farmer" ? () => handleFarmerClick(step) : null}
                    >
                      <Icon className="text-xl text-gray-700" />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className={`ml-14 flex-1 border-2 ${step.borderColor} bg-white p-4 rounded-md shadow-sm`}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-base font-semibold text-gray-800">{step.role}</h3>
                      <p className="text-xs text-gray-500">{step.date} • {step.time}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <FaMapMarkerAlt className="mr-2 text-red-400" />
                      {step.location}
                    </div>
                    <p className="text-sm text-gray-700 leading-snug mb-3">{step.description}</p>

                    <div className="text-xs text-gray-600 space-y-1">
                      {step.companyName && (
                        <p>
                          <span className="font-semibold text-gray-800">Company:</span> {step.companyName}
                        </p>
                      )}
                      {step.supervisor && (
                        <p>
                          <span className="font-semibold text-gray-800">Supervisor:</span> {step.supervisor}
                        </p>
                      )}
                      {step.pramanId && (
                        <p>
                          <span className="font-semibold text-gray-800">USER ID:</span> {step.pramanId}
                        </p>
                      )}
                      {step.batchId && (
                        <p>
                          <span className="font-semibold text-gray-800">Batch ID:</span> {step.batchId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Box */}
          <div className="mt-10 text-center">
            <div className="inline-block bg-green-50 border border-green-400 text-green-800 px-6 py-4 rounded-md">
              <strong className="text-lg">✅ Journey Completed</strong>
              <p className="text-sm mt-1">
                Your herb has completed its path through the verified supply chain.
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Menu
            </button>
            <button
              onClick={() => navigate("/consumer")}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
        </main>

        {/* Popup for Farmer Details */}
        {showPopup && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[90vh]">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedFarmer.role.toUpperCase()}</h2>

                {/* Farmer Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 ">
                 
                </div>

                <div className="w-full text-sm text-gray-700 space-y-1">
                  {selectedFarmer.companyName && <p><strong>Company:</strong> {selectedFarmer.companyName}</p>}
                  {selectedFarmer.supervisor && <p><strong>Supervisor:</strong> {selectedFarmer.supervisor}</p>}
                  {selectedFarmer.pramanId && <p><strong>PRAMAN ID:</strong> {selectedFarmer.pramanId}</p>}
                  {selectedFarmer.batchId && <p><strong>Batch ID:</strong> {selectedFarmer.batchId}</p>}
                  {selectedFarmer.date && <p><strong>Date:</strong> {selectedFarmer.date}</p>}
                  {selectedFarmer.time && <p><strong>Time:</strong> {selectedFarmer.time}</p>}
                </div>

                {/* Location */}
                {selectedFarmer.location && (
                  <div className="mb-4 w-full">
                    <h3 className="text-lg font-semibold text-gray-800">Farm Location</h3>
                    <p className="text-gray-600 mb-2">{selectedFarmer.location}</p>
                    {selectedFarmer.locationPhoto && (
                      <div className="w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={selectedFarmer.locationPhoto}
                          alt="Farm Location"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Logged Pictures */}
                {selectedFarmer.loggedPictures && selectedFarmer.loggedPictures.length > 0 && (
                  <div className="mb-4 w-full">
                    <h3 className="text-lg font-semibold text-gray-800">Logged Pictures</h3>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {selectedFarmer.loggedPictures.map((image, index) => (
                        <div key={index} className="w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={image}
                            alt={`Logged Picture ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
