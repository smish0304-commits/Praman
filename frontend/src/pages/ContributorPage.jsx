import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '../contexts/ToastContext'
import web3Service from '../utils/web3Service'

function ContributorPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)
  const { showError, showSuccess } = useToast()

  const supplyChainRoles = [
    {
      id: 'farmer',
      title: 'Farmer',
      emoji: '🌾',
      description: 'Grow and harvest agricultural products',
      color: 'green',
      details: 'Grow and harvest agricultural products for the supply chain.',
      responsibilities: ['Crop cultivation and management', 'Quality control of produce', 'Harvest timing and planning', 'Sustainable farming practices']
    },
    {
      id: 'collector',
      title: 'Collector',
      emoji: '📋',
      description: 'Gather and organize products from farmers',
      color: 'blue',
      details: 'Gather and organize products from multiple farmers.',
      responsibilities: ['Product collection from farmers', 'Quality assessment', 'Documentation and tracking', 'Coordination with multiple suppliers']
    },
    {
      id: 'lab',
      title: 'Lab (Quality Inspector)',
      emoji: '🔬',
      description: 'Test and ensure product quality and safety',
      color: 'purple',
      details: 'Test and certify products for quality and safety standards.',
      responsibilities: ['Product testing and analysis', 'Quality certification', 'Compliance verification', 'Safety standards enforcement']
    },
    {
      id: 'supplier',
      title: 'Supplier',
      emoji: '📦',
      description: 'Provide processed materials and components',
      color: 'orange',
      details: 'Provide processed materials and components to the supply chain.',
      responsibilities: ['Material procurement', 'Quality assurance', 'Timely delivery coordination', 'Inventory management']
    },
    {
      id: 'distributor',
      title: 'Distributor',
      emoji: '🚚',
      description: 'Handle logistics and distribution networks',
      color: 'indigo',
      details: 'Manage logistics and transportation of products to retailers.',
      responsibilities: ['Logistics coordination', 'Transportation management', 'Warehouse operations', 'Delivery optimization']
    },
    {
      id: 'retailer',
      title: 'Retailer',
      emoji: '🏪',
      description: 'Sell products directly to consumers',
      color: 'red',
      details: 'Sell products to consumers.',
      responsibilities: ['Inventory management', 'Customer service', 'Sales and marketing', 'Product presentation']
    }
  ]

  const handleRoleClick = (roleId) => {
    const role = supplyChainRoles.find(r => r.id === roleId)
    setSelectedRole(role)
  }

  const handleWalletConnect = async () => {
    if (!selectedRole) return

    // Bypass blockchain for farmer and supplier
    if (selectedRole.id === 'farmer') {
      navigate('/farmer')
      return
    }
    if (selectedRole.id === 'supplier') {
      navigate('/supplier')
      return
    }

    // Blockchain logic for other roles
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts && accounts.length > 0) {
        let registeredUser = null
        let registeredAddress = null

        for (const account of accounts) {
          const userCheck = await checkUserExists(account)
          if (userCheck.exists) {
            registeredUser = userCheck.user
            registeredAddress = account
            break
          }
        }

        const walletAddress = registeredAddress || accounts[0]
        localStorage.setItem('walletAddress', walletAddress)

        window.dispatchEvent(new CustomEvent('walletConnected', {
          detail: { address: walletAddress }
        }))

        if (registeredUser && registeredAddress) {
          const currentRole = registeredUser.role
          const selectedRoleId = selectedRole.id

          if (currentRole === selectedRoleId) {
            showSuccess(`Welcome back! You're already registered as a ${selectedRole.title}`)
            closeModal()
            navigate(`/dashboard/${selectedRoleId}`)
            return
          } else {
            const shortAddress = `${registeredAddress.slice(0, 6)}...${registeredAddress.slice(-4)}`
            showError(`Dear address ${shortAddress}, you are already registered as a "${currentRole}". Please login there instead of trying to register as a "${selectedRole.title}".`, 10000)
            closeModal()
            setTimeout(() => {
              navigate('/contributor')
            }, 3000)
            return
          }
        }

        const userCheck = await checkUserExists(walletAddress)

        if (userCheck.exists) {
          const currentRole = userCheck.user.role
          const selectedRoleId = selectedRole.id

          if (currentRole === selectedRoleId) {
            showSuccess(`Welcome back! You're already registered as a ${selectedRole.title}`)
            closeModal()
            navigate(`/dashboard/${selectedRoleId}`)
          } else {
            const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            showError(`Dear address ${shortAddress}, you are already registered as a "${currentRole}". Please login there instead of trying to register as a "${selectedRole.title}".`, 10000)
            closeModal()
            setTimeout(() => {
              navigate('/contributor')
            }, 3000)
            return
          }
        } else {
          showSuccess(`Welcome! You can now register as a ${selectedRole.title}`)
          closeModal()
          navigate(`/register/${selectedRole.id}`)
        }
      }
    } catch (error) {
      console.error('MetaMask connection error:', error)
      window.dispatchEvent(new CustomEvent('walletDisconnected'))

      if (error.code === 4001) {
        alert('Connection was rejected. Please try again.')
      } else if (error.code === -32002) {
        alert('MetaMask connection request already pending. Please check MetaMask.')
      } else {
        alert('Failed to connect to MetaMask. Please try again.')
      }
    }
  }

  const checkUserExists = async (walletAddress) => {
    try {
      await web3Service.initialize()
      const isRegistered = await web3Service.isUserRegistered(walletAddress)

      if (isRegistered) {
        const user = await web3Service.getUser(walletAddress)
        if (user && user.exists) {
          return { exists: true, user }
        } else {
          return { exists: false, user: null }
        }
      }
      return { exists: false, user: null }
    } catch (error) {
      console.error('Error checking user existence:', error)
      return { exists: false, user: null }
    }
  }

  const closeModal = () => {
    setSelectedRole(null)
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start px-12 pt-8">
      <div className="w-full max-w-6xl mb-4 flex justify-start">
        <button
          onClick={() => navigate('/')}
          className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-2 font-semibold text-lg bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
        >
          ← Back to Home
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-wider" style={{ fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          Choose Your Role
        </h1>
        <p className="text-xl font-semibold text-gray-800 max-w-2xl mx-auto">
          Select your position in the supply chain to access role-based features and data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {supplyChainRoles.map((role) => (
          <div key={role.id} className="group cursor-pointer h-full">
            <div
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-${role.color}-500 h-full flex flex-col justify-between`}
              onClick={() => handleRoleClick(role.id)}
            >
              <div>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {role.emoji}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {role.title}
                </h2>
              </div>
              <p className="text-base font-medium text-gray-700 leading-relaxed">
                {role.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedRole && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-80 h-80 flex flex-col border border-gray-200 transform transition-all duration-500 ease-out hover:scale-105"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-3xl p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-4xl bg-white bg-opacity-20 rounded-full p-3">
                    {selectedRole.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedRole.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition-colors text-2xl font-light hover:bg-white hover:bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="text-center">
                <p className="text-gray-700 text-base leading-relaxed">
                  {selectedRole.details}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWalletConnect}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  🔗 Connect Wallet
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-2 px-6 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  )
}

export default ContributorPage
