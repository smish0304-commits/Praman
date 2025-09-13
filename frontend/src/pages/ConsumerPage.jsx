import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ConsumerPage = () => {
  const [batchId, setBatchId] = useState("")
  const [cameraOn, setCameraOn] = useState(false)
  const videoRef = useRef(null)
  const navigate = useNavigate()

  // Start back camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }, // ✅ Force back camera
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCameraOn(true)

      // ⏳ Auto-redirect after 10 sec
      setTimeout(() => {
        navigate("/details", { state: { batchId: "CAMERA-SCANNED" } })
      }, 10000)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access back camera. Please allow permissions.")
    }
  }

  // Stop camera when leaving
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraOn(false)
  }

  const handleBatchIdChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    if (value.length > 22) value = value.slice(0, 22)

    let formatted = value
    if (value.length > 6 && value.length <= 22) {
      formatted = value.slice(0, 6) + "-" + value.slice(6, Math.min(22, value.length))
    }
    if (value.length === 22) {
      formatted =
        value.slice(0, 6) + "-" + value.slice(6, 19) + "-" + value.slice(19, 22)
    }

    setBatchId(formatted)
  }

  const handleEnter = () => {
    const cleanValue = batchId.replace(/[^A-Z0-9]/g, "")
    if (cleanValue.length !== 22) {
      alert("Batch ID must be exactly 22 characters (A-Z, 0-9).")
      return
    }
    navigate("/details", { state: { batchId } })
  }

  useEffect(() => {
    return () => stopCamera() // cleanup on unmount
  }, [])

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        SCAN QR ON PRODUCT
      </h1>

      {/* Camera / QR Box */}
      <div className="w-72 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6 flex items-center justify-center">
        {cameraOn ? (
          <video ref={videoRef} className="w-full h-full object-cover" />
        ) : (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Start Camera
          </button>
        )}
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
          placeholder="XXXXXX-XXXXXXXXXXXXXX-XXX"
          maxLength={24}
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
        onClick={() => {
          stopCamera()
          navigate(-1)
        }}
        className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
      >
        Go Back
      </button>
    </div>
  )
}

export default ConsumerPage
