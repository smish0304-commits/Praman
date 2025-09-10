// Web3 Service for PRAMAN Blockchain Integration
import Web3 from 'web3'

class Web3Service {
  constructor() {
    this.web3 = null
    this.contract = null
    this.contractAddress = null
    this.contractABI = null
  }

  // Initialize Web3 connection
  async initialize() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        this.web3 = new Web3(window.ethereum)
        console.log('✅ Web3 initialized with MetaMask')
        return true
      } else {
        console.error('❌ MetaMask not detected')
        return false
      }
    } catch (error) {
      console.error('❌ Error initializing Web3:', error)
      return false
    }
  }

  // Get current account
  async getCurrentAccount() {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      const accounts = await this.web3.eth.getAccounts()
      return accounts[0] || null
    } catch (error) {
      console.error('❌ Error getting current account:', error)
      return null
    }
  }

  // Get network ID
  async getNetworkId() {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      return await this.web3.eth.net.getId()
    } catch (error) {
      console.error('❌ Error getting network ID:', error)
      return null
    }
  }

  // Get current block number
  async getCurrentBlockNumber() {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      return await this.web3.eth.getBlockNumber()
    } catch (error) {
      console.error('❌ Error getting block number:', error)
      return null
    }
  }

  // Get balance
  async getBalance(address) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      const balance = await this.web3.eth.getBalance(address)
      return this.web3.utils.fromWei(balance, 'ether')
    } catch (error) {
      console.error('❌ Error getting balance:', error)
      return null
    }
  }

  // Generate transaction hash
  generateTransactionHash(from, to, data, nonce) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      const transaction = {
        from,
        to,
        data,
        nonce
      }
      
      return this.web3.utils.sha3(JSON.stringify(transaction))
    } catch (error) {
      console.error('❌ Error generating transaction hash:', error)
      return null
    }
  }

  // Sign message
  async signMessage(message, account) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      return await this.web3.eth.personal.sign(message, account)
    } catch (error) {
      console.error('❌ Error signing message:', error)
      return null
    }
  }

  // Verify signature
  async verifySignature(message, signature, account) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      const recoveredAccount = await this.web3.eth.personal.ecRecover(message, signature)
      return recoveredAccount.toLowerCase() === account.toLowerCase()
    } catch (error) {
      console.error('❌ Error verifying signature:', error)
      return false
    }
  }

  // Contract interaction methods for PRAMAN Supply Chain
  async deployContract(contractABI, contractBytecode, constructorArgs = []) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      const account = await this.getCurrentAccount()
      if (!account) {
        throw new Error('No account connected')
      }
      
      const contract = new this.web3.eth.Contract(contractABI)
      const deploy = contract.deploy({
        data: contractBytecode,
        arguments: constructorArgs
      })
      
      const deployedContract = await deploy.send({
        from: account,
        gas: 3000000
      })
      
      this.contract = deployedContract
      this.contractAddress = deployedContract.options.address
      this.contractABI = contractABI
      
      console.log('✅ Contract deployed at:', this.contractAddress)
      return deployedContract
    } catch (error) {
      console.error('❌ Error deploying contract:', error)
      return null
    }
  }

  // Load existing contract
  async loadContract(contractAddress, contractABI) {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      this.contract = new this.web3.eth.Contract(contractABI, contractAddress)
      this.contractAddress = contractAddress
      this.contractABI = contractABI
      
      console.log('✅ Contract loaded at:', contractAddress)
      return this.contract
    } catch (error) {
      console.error('❌ Error loading contract:', error)
      return null
    }
  }

  // Call contract method (read-only)
  async callContractMethod(methodName, args = []) {
    try {
      if (!this.contract) {
        throw new Error('Contract not loaded')
      }
      
      return await this.contract.methods[methodName](...args).call()
    } catch (error) {
      console.error(`❌ Error calling contract method ${methodName}:`, error)
      return null
    }
  }

  // Send contract transaction
  async sendContractTransaction(methodName, args = [], options = {}) {
    try {
      if (!this.contract) {
        throw new Error('Contract not loaded')
      }
      
      const account = await this.getCurrentAccount()
      if (!account) {
        throw new Error('No account connected')
      }
      
      const transaction = this.contract.methods[methodName](...args)
      const gasEstimate = await transaction.estimateGas({ from: account })
      
      const result = await transaction.send({
        from: account,
        gas: gasEstimate,
        ...options
      })
      
      console.log(`✅ Transaction sent for ${methodName}:`, result.transactionHash)
      return result
    } catch (error) {
      console.error(`❌ Error sending contract transaction ${methodName}:`, error)
      return null
    }
  }

  // ===== BLOCKCHAIN FUNCTIONS (IMPLEMENTED FOR LOCAL BLOCKCHAIN) =====
  
  // Contract configuration for local blockchain
  CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  CONTRACT_ABI = [
    // Contract ABI will be loaded from artifacts
  ]

  // Load contract ABI from artifacts
  async loadContractABI() {
    try {
      // In a real deployment, you would load this from the artifacts folder
      // For now, we'll use a simplified ABI with the essential functions
      this.CONTRACT_ABI = [
        {
          "inputs": [{"internalType": "string", "name": "_name", "type": "string"}, {"internalType": "string", "name": "_email", "type": "string"}, {"internalType": "string", "name": "_regdNo", "type": "string"}, {"internalType": "string", "name": "_role", "type": "string"}],
          "name": "registerUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_batchId", "type": "string"}, {"internalType": "string", "name": "_cropName", "type": "string"}, {"internalType": "uint256", "name": "_quantity", "type": "uint256"}, {"internalType": "string", "name": "_variant", "type": "string"}, {"internalType": "string", "name": "_condition", "type": "string"}, {"internalType": "string", "name": "_contaminationLevel", "type": "string"}, {"internalType": "uint256", "name": "_latitude", "type": "uint256"}, {"internalType": "uint256", "name": "_longitude", "type": "uint256"}, {"internalType": "string", "name": "_location", "type": "string"}, {"internalType": "uint256", "name": "_rainfall", "type": "uint256"}, {"internalType": "uint256", "name": "_humidity", "type": "uint256"}, {"internalType": "uint256", "name": "_temperature", "type": "uint256"}, {"internalType": "uint256", "name": "_windSpeed", "type": "uint256"}, {"internalType": "uint256", "name": "_pressure", "type": "uint256"}, {"internalType": "string", "name": "_signatureHash", "type": "string"}],
          "name": "createGenesisBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_batchId", "type": "string"}, {"internalType": "string", "name": "_recipientRegdNo", "type": "string"}, {"internalType": "string", "name": "_transportMethod", "type": "string"}, {"internalType": "string", "name": "_newSignatureHash", "type": "string"}],
          "name": "sendBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_batchId", "type": "string"}, {"internalType": "string", "name": "_qualityCheck", "type": "string"}, {"internalType": "string", "name": "_newSignatureHash", "type": "string"}],
          "name": "receiveBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_batchId", "type": "string"}],
          "name": "getBatch",
          "outputs": [{"components": [{"internalType": "string", "name": "batchId", "type": "string"}, {"internalType": "string", "name": "regdNo", "type": "string"}, {"internalType": "string", "name": "cropName", "type": "string"}, {"internalType": "uint256", "name": "quantity", "type": "uint256"}, {"internalType": "string", "name": "variant", "type": "string"}, {"internalType": "string", "name": "condition", "type": "string"}, {"internalType": "string", "name": "contaminationLevel", "type": "string"}, {"internalType": "uint256", "name": "latitude", "type": "uint256"}, {"internalType": "uint256", "name": "longitude", "type": "uint256"}, {"internalType": "string", "name": "location", "type": "string"}, {"internalType": "uint256", "name": "rainfall", "type": "uint256"}, {"internalType": "uint256", "name": "humidity", "type": "uint256"}, {"internalType": "uint256", "name": "temperature", "type": "uint256"}, {"internalType": "uint256", "name": "windSpeed", "type": "uint256"}, {"internalType": "uint256", "name": "pressure", "type": "uint256"}, {"internalType": "string", "name": "signatureHash", "type": "string"}, {"internalType": "string", "name": "transactionHash", "type": "string"}, {"internalType": "uint256", "name": "blockNumber", "type": "uint256"}, {"internalType": "string", "name": "status", "type": "string"}, {"internalType": "string", "name": "supplyChainStage", "type": "string"}, {"internalType": "string", "name": "previousActor", "type": "string"}, {"internalType": "string", "name": "nextActor", "type": "string"}, {"internalType": "uint256", "name": "createdAt", "type": "uint256"}, {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}, {"internalType": "bool", "name": "exists", "type": "bool"}], "internalType": "struct PRAMANSupplyChain.Batch", "name": "", "type": "tuple"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllBatches",
          "outputs": [{"components": [{"internalType": "string", "name": "batchId", "type": "string"}, {"internalType": "string", "name": "regdNo", "type": "string"}, {"internalType": "string", "name": "cropName", "type": "string"}, {"internalType": "uint256", "name": "quantity", "type": "uint256"}, {"internalType": "string", "name": "variant", "type": "string"}, {"internalType": "string", "name": "condition", "type": "string"}, {"internalType": "string", "name": "contaminationLevel", "type": "string"}, {"internalType": "uint256", "name": "latitude", "type": "uint256"}, {"internalType": "uint256", "name": "longitude", "type": "uint256"}, {"internalType": "string", "name": "location", "type": "string"}, {"internalType": "uint256", "name": "rainfall", "type": "uint256"}, {"internalType": "uint256", "name": "humidity", "type": "uint256"}, {"internalType": "uint256", "name": "temperature", "type": "uint256"}, {"internalType": "uint256", "name": "windSpeed", "type": "uint256"}, {"internalType": "uint256", "name": "pressure", "type": "uint256"}, {"internalType": "string", "name": "signatureHash", "type": "string"}, {"internalType": "string", "name": "transactionHash", "type": "string"}, {"internalType": "uint256", "name": "blockNumber", "type": "uint256"}, {"internalType": "string", "name": "status", "type": "string"}, {"internalType": "string", "name": "supplyChainStage", "type": "string"}, {"internalType": "string", "name": "previousActor", "type": "string"}, {"internalType": "string", "name": "nextActor", "type": "string"}, {"internalType": "uint256", "name": "createdAt", "type": "uint256"}, {"internalType": "uint256", "name": "updatedAt", "type": "uint256"}, {"internalType": "bool", "name": "exists", "type": "bool"}], "internalType": "struct PRAMANSupplyChain.Batch[]", "name": "", "type": "tuple[]"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_walletAddress", "type": "address"}],
          "name": "getUser",
          "outputs": [{"components": [{"internalType": "string", "name": "name", "type": "string"}, {"internalType": "string", "name": "email", "type": "string"}, {"internalType": "string", "name": "regdNo", "type": "string"}, {"internalType": "string", "name": "role", "type": "string"}, {"internalType": "address", "name": "walletAddress", "type": "address"}, {"internalType": "bool", "name": "exists", "type": "bool"}], "internalType": "struct PRAMANSupplyChain.User", "name": "", "type": "tuple"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_walletAddress", "type": "address"}],
          "name": "isUserRegistered",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
          "name": "canCreateGenesisBatch",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
          "name": "canSendBatch",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
          "name": "canReceiveBatch",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
          "name": "getUserRole",
          "outputs": [{"internalType": "string", "name": "", "type": "string"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_senderRole", "type": "string"}, {"internalType": "string", "name": "_recipientRole", "type": "string"}],
          "name": "canInteractWithRole",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getValidRoles",
          "outputs": [{"internalType": "string[7]", "name": "", "type": "string[7]"}],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {"internalType": "string", "name": "_newRole", "type": "string"}],
          "name": "isAddressRegisteredWithDifferentRole",
          "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "_regdNo", "type": "string"}],
          "name": "getAddressByRegdNo",
          "outputs": [{"internalType": "address", "name": "", "type": "address"}],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      console.log('✅ Contract ABI loaded successfully')
    } catch (error) {
      console.error('❌ Error loading contract ABI:', error)
    }
  }

  // Get contract instance for API services
  getContractInstance() {
    if (!this.contract) {
      throw new Error('Contract not loaded. Please load contract first.')
    }
    return this.contract
  }

  // Load the deployed contract
  async loadDeployedContract() {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized')
      }
      
      await this.loadContractABI()
      
      this.contract = new this.web3.eth.Contract(this.CONTRACT_ABI, this.CONTRACT_ADDRESS)
      console.log('✅ Deployed contract loaded at:', this.CONTRACT_ADDRESS)
      return this.contract
    } catch (error) {
      console.error('❌ Error loading deployed contract:', error)
      throw error
    }
  }

  // Get all batches from contract
  async getAllBatches() {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getAllBatches().call()
    } catch (error) {
      console.error(`❌ Error getting all batches:`, error)
      throw error
    }
  }

  // Get batch by ID
  async getBatch(batchId) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getBatch(batchId).call()
    } catch (error) {
      console.error(`❌ Error getting batch ${batchId}:`, error)
      throw error
    }
  }

  // Get user information
  async getUser(address) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getUser(address).call()
    } catch (error) {
      console.error(`❌ Error getting user ${address}:`, error)
      // Return null if user doesn't exist instead of throwing
      if (error.message && error.message.includes('User not found')) {
        return null
      }
      throw error
    }
  }

  // Check if user is registered
  async isUserRegistered(address) {
    try {
      console.log('🔍 Web3Service: Checking registration for:', address)
      
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      const result = await this.contract.methods.isUserRegistered(address).call()
      console.log('🔍 Web3Service: Raw result from contract:', result, typeof result)
      
      // Ensure we return a boolean value
      const booleanResult = Boolean(result)
      console.log('🔍 Web3Service: Boolean result:', booleanResult)
      return booleanResult
    } catch (error) {
      console.error(`❌ Error checking user registration ${address}:`, error)
      // If there's an error, assume user is not registered
      return false
    }
  }

  // ===== ROLE VALIDATION FUNCTIONS =====

  // Check if user can create genesis batches (only farmers)
  async canCreateGenesisBatch(userAddress) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.canCreateGenesisBatch(userAddress).call()
    } catch (error) {
      console.error('❌ Error checking genesis batch creation permission:', error)
      return false
    }
  }

  // Check if user can send batches
  async canSendBatch(userAddress) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.canSendBatch(userAddress).call()
    } catch (error) {
      console.error('❌ Error checking send batch permission:', error)
      return false
    }
  }

  // Check if user can receive batches
  async canReceiveBatch(userAddress) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.canReceiveBatch(userAddress).call()
    } catch (error) {
      console.error('❌ Error checking receive batch permission:', error)
      return false
    }
  }

  // Get user role
  async getUserRole(userAddress) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getUserRole(userAddress).call()
    } catch (error) {
      console.error('❌ Error getting user role:', error)
      return null
    }
  }

  // Check if two roles can interact
  async canInteractWithRole(senderRole, recipientRole) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.canInteractWithRole(senderRole, recipientRole).call()
    } catch (error) {
      console.error('❌ Error checking role interaction:', error)
      return false
    }
  }

  // Get all valid roles
  async getValidRoles() {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getValidRoles().call()
    } catch (error) {
      console.error('❌ Error getting valid roles:', error)
      return []
    }
  }

  // Check if address is registered with different role
  async isAddressRegisteredWithDifferentRole(address, newRole) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.isAddressRegisteredWithDifferentRole(address, newRole).call()
    } catch (error) {
      console.error('❌ Error checking role conflict:', error)
      return false
    }
  }

  // Get address by registration number
  async getAddressByRegdNo(regdNo) {
    try {
      if (!this.contract) {
        await this.loadDeployedContract()
      }
      
      return await this.contract.methods.getAddressByRegdNo(regdNo).call()
    } catch (error) {
      console.error('❌ Error getting address by registration number:', error)
      return null
    }
  }
}

// Create singleton instance
const web3Service = new Web3Service()

export default web3Service
