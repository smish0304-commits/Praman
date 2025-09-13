import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const ConsumerPage = () => {
  const videoRef = useRef(null)
  const [batchId, setBatchId] = useState("")
  const [cameraStarted, setCameraStarted] = useState(false)
  const navigate = useNavigate()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraStarted(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Cannot access camera. Please allow camera permissions.")
    }
  }

  // Allow letters + digits, force uppercase, format XXXX-XXXX-XX
  const handleBatchIdChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") // allow only A-Z, 0-9
    if (value.length > 10) value = value.slice(0, 10)

    let formatted = value
    if (value.length > 4 && value.length <= 8) {
      formatted = value.slice(0, 4) + "-" + value.slice(4)
    } else if (value.length > 8) {
      formatted =
        value.slice(0, 4) + "-" + value.slice(4, 8) + "-" + value.slice(8)
    }

    setBatchId(formatted)
  }

  const handleEnter = () => {
    if (batchId.replace(/[^A-Z0-9]/g, "").length !== 10) {
      alert("Batch ID must be 10 characters (A-Z, 0-9).")
      return
    }
    navigate("/details", { state: { batchId } }) // Navigate to Details page
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        SCAN QR ON PRODUCT
      </h1>

      {/* Camera Preview */}
      <div className="w-72 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6 flex items-center justify-center">
        {!cameraStarted && (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Start Camera
          </button>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover ${
            !cameraStarted ? "hidden" : ""
          }`}
        />
      </div>

      {/* Batch ID Input */}
      <div className="w-full max-w-md mb-4">
        <label
          htmlFor="batchId"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Enter BATCH ID:
        </label>
        <input
          id="batchId"
          type="text"
          value={batchId}
          onChange={handleBatchIdChange}
          placeholder="XXXX-XXXX-XX"
          maxLength={12}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Enter Button */}
      <button
        onClick={handleEnter}
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition mb-4"
      >
        Enter
      </button>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
      >
        Go Back
      </button>
    </div>
  )
}

export default ConsumerPage
