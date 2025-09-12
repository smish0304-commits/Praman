import React, { useState, useEffect } from 'react'
import logo from "../assets/logo.png"
function Header() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const address = localStorage.getItem('walletAddress')
    if (address) {
      setWalletAddress(address)
      setIsConnected(true)
    }

    // Listen for wallet connection changes
    const handleStorageChange = () => {
      const address = localStorage.getItem('walletAddress')
      if (address) {
        setWalletAddress(address)
        setIsConnected(true)
      } else {
        setWalletAddress('')
        setIsConnected(false)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    

    window.addEventListener('walletConnected', handleStorageChange)
    window.addEventListener('walletDisconnected', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('walletConnected', handleStorageChange)
      window.removeEventListener('walletDisconnected', handleStorageChange)
    }
  }, [])

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleDisconnect = () => {
    localStorage.removeItem('walletAddress')
    setWalletAddress('')
    setIsConnected(false)
    
    // Dispatch disconnect event
    window.dispatchEvent(new CustomEvent('walletDisconnected'))
    
    // Redirect to home page
    window.location.href = '/'
  }

  return (
 <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-transparent">
  {/* Gradient underline */}
  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-20">
    <div className="relative flex justify-between items-center h-20">
      
      {/* Logo (centered) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex items-center justify-center">
        <img
          src={logo}
          alt="PRAMAN Logo"
          className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Wallet + Nav (right side) */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Wallet Connection Status */}
        {isConnected ? (
          <div className="flex items-center">
            {/* Mobile view (dot only) */}
            <div className="md:hidden w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>

            {/* Desktop view (full status) */}
            <div className="hidden md:flex items-center space-x-3 bg-green-50/70 border border-green-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                <span className="text-sm font-medium text-green-800">Connected</span>
              </div>
              <div className="text-sm font-mono text-green-700 bg-green-100/80 px-2 py-1 rounded">
                {formatAddress(walletAddress)}
              </div>
              <button
                onClick={handleDisconnect}
                className="text-green-600 hover:text-green-800 hover:bg-green-100/80 rounded px-2 py-1 text-xs font-medium transition-colors"
                title="Disconnect Wallet"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            {/* Mobile view (dot only) */}
            <div className="md:hidden w-3 h-3 bg-gray-400 rounded-full animate-pulse shadow-sm shadow-gray-400/50"></div>

            {/* Desktop view (full status) */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50/70 border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse shadow-sm shadow-gray-400/50"></div>
              <span className="text-sm font-medium text-gray-600">Not Connected</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-gray-700 font-medium transition-colors hover:text-gray-900 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </div>
</header>


)
}

export default Header
