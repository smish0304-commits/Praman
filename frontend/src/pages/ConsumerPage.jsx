import React, { useEffect, useRef, useState } from "react"

const ConsumerPage = () => {
  const videoRef = useRef(null)
  const [batchId, setBatchId] = useState("")

  useEffect(() => {
    // Open the camera
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }
    openCamera()
  }, [])

  return (
    <div className="flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        SCAN QR ON PRODUCT
      </h1>

      {/* Camera Preview */}
      <div className="w-72 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Batch ID Input */}
      <div className="w-full max-w-md">
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
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Enter batch ID here"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default ConsumerPage
