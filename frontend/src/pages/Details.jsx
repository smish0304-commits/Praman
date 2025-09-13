import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {
  FaTractor,
  FaTruck,
  FaVial,
  FaWarehouse,
  FaStore,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa"

const Details = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const batchId = location.state?.batchId || "UNKNOWN"

  const supplyChainData = [
    {
      role: "Farmer",
      location: "Village Balangir, Odisha",
      description: "Herbs carefully harvested and quality-checked on site.",
      date: "2024-01-15",
      time: "08:30 AM",
      icon: FaTractor,
      borderColor: "border-green-500",
      companyName: "Balangir Organic Farms",
      supervisor: "Ramesh Kumar",
      pramanId: "PRM-20240115-0001",
      batchId: "FARM-0001-23",
    },
    {
      role: "Collector",
      location: "Village Balangir, Odisha",
      description: "Collected and consolidated herbs at the local storage facility.",
      date: "2024-01-15",
      time: "10:30 AM",
      icon: FaTruck,
      borderColor: "border-blue-500",
      companyName: "Balangir Herb Collectors Ltd",
      supervisor: "Sunita Das",
      pramanId: "PRM-20240115-0002",
      batchId: "COLL-0001-23",
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
      pramanId: "PRM-20240115-0003",
      batchId: "LAB-0001-23",
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
      pramanId: "PRM-20240117-0004",
      batchId: "DIST-0001-23",
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
      pramanId: "PRM-20240118-0005",
      batchId: "RETL-0001-23",
    },
    {
      role: "Consumer",
      location: "Bhubaneswar, Odisha",
      description: "Product purchased, verified via QR code for authenticity.",
      date: "2024-01-20",
      time: "09:15 AM",
      icon: FaUser,
      borderColor: "border-gray-500",
      companyName: "End Consumer",
      supervisor: "Self",
      pramanId: "PRM-20240120-0006",
      batchId: "CONS-0001-23",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Product Journey Timeline
          </h1>
          <p className="text-blue-700 text-2xl font-bold">Batch: {batchId}</p>
          <p className="text-gray-600 text-lg">Tracking for Tulsi Leaves</p>
        </div>

        {/* Timeline */}
        <div className="relative pl-12">
          {/* Glowing Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-blue-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full"></div>

          {supplyChainData.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative mb-10 flex items-start group">
                {/* Icon Circle */}
                <div className="absolute left-0 top-1 z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 shadow-md">
                    <Icon className="text-xl text-gray-700" />
                  </div>
                </div>

                {/* Info Box */}
                <div
                  className={`ml-14 flex-1 border-2 ${step.borderColor} bg-white p-4 rounded-md shadow-sm`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base font-semibold text-gray-800">{step.role}</h3>
                    <p className="text-xs text-gray-500">
                      {step.date} • {step.time}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <FaMapMarkerAlt className="mr-2 text-red-400" />
                    {step.location}
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mb-3">{step.description}</p>

                  {/* Additional Details */}
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
                        <span className="font-semibold text-gray-800">PRAMAN ID:</span> {step.pramanId}
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
            )
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

        {/* Buttons */}
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
    </div>
  )
}

export default Details
