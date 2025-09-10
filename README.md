# PRAMAN Supply Chain

A blockchain-based supply chain management system built with Ethereum smart contracts, React frontend, and Node.js backend.

## 🚀 Features

- **Smart Contract Management**: Deploy and manage supply chain operations on Ethereum
- **Role-Based Access**: Different roles for manufacturers, distributors, and retailers
- **Batch Tracking**: Complete traceability of products through the supply chain
- **Real-time Updates**: Live transaction monitoring and status updates
- **Modern UI**: Built with React and Tailwind CSS
- **Local Development**: Easy setup with Hardhat local blockchain

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **Git**

## 🛠️ Quick Setup

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
# Run the automated setup script
setup-local-blockchain.bat
```

**For Linux/Mac:**
```bash
# Make the script executable and run
chmod +x setup-local-blockchain.sh
./setup-local-blockchain.sh
```

### Option 2: Manual Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd HackEnigma
```

2. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

3. **Compile smart contracts:**
```bash
npx hardhat compile
```

## 🏃‍♂️ Running the Application

### 1. Start Local Blockchain

```bash
# Start Hardhat local blockchain
npm run node
```

This starts a local blockchain on `http://127.0.0.1:8545` with 20 test accounts, each with 10,000 ETH.

### 2. Deploy Smart Contract

In a new terminal:

```bash
# Deploy contract to local blockchain
npm run deploy:local
```

Copy the contract address from the output - you'll need it for the frontend.

### 3. Start Frontend

In another terminal:

```bash
# Start the React development server
npm run frontend:dev
```

The frontend will be available at `http://localhost:5173`

### 4. Start Backend (Optional)

In another terminal:

```bash
# Start the Node.js backend server
cd backend
npm start
```

The backend API will be available at `http://localhost:3000`

## 🔧 Configuration

### MetaMask Setup

1. Open MetaMask browser extension
2. Click on network dropdown
3. Select "Add Network"
4. Enter the following details:
   - **Network Name**: `Hardhat Local`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`

### Import Test Accounts

When you run `npm run node`, you'll see test accounts with private keys. Import these into MetaMask:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

### Update Frontend Configuration

After deploying the contract, update `frontend/src/utils/web3Service.js` with:
- Contract address (from deployment output)
- Contract ABI (from `artifacts/contracts/PRAMANSupplyChain.sol/PRAMANSupplyChain.json`)

## 🧪 Testing the System

### 1. Create Genesis Batch
- Connect MetaMask to local network
- Use Account #0 (Manufacturer)
- Create a genesis batch through the frontend

### 2. Send Batch
- Switch to Account #1 (Distributor)
- Send the batch to another account

### 3. Receive Batch
- Switch to Account #2 (Retailer)
- Receive the batch

### 4. View Transaction History
- Check the complete transaction history
- Verify all events are recorded

## 📁 Project Structure

```
├── 📁 artifacts/              # Compiled smart contracts
├── 📁 backend/                # Node.js backend API
│   ├── package.json
│   └── server.js
├── 📁 cache/                  # Hardhat cache
├── 📁 frontend/               # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 utils/          # Utility functions
│   │   └── 📁 contexts/       # React contexts
│   ├── 📁 contracts/          # Smart contracts
│   └── package.json
├── 📁 scripts/                # Deployment and test scripts
├── 📁 test/                   # Smart contract tests
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Root dependencies
└── README.md                  # This file
```

## 🔨 Available Scripts

### Root Level
```bash
npm run compile          # Compile smart contracts
npm run test            # Run smart contract tests
npm run node            # Start local blockchain
npm run deploy:local    # Deploy to local blockchain
npm run deploy:hardhat  # Deploy to Hardhat network
npm run frontend:dev    # Start frontend development server
npm run frontend:build  # Build frontend for production
```

### Frontend
```bash
cd frontend
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

### Backend
```bash
cd backend
npm start              # Start production server
npm run dev            # Start development server with nodemon
```

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/PRAMANSupplyChain.test.js

# Test deployed contract
npx hardhat run scripts/test-contract.js --network localhost
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Local Development
1. Start local blockchain: `npm run node`
2. Deploy contract: `npm run deploy:local`
3. Start frontend: `npm run frontend:dev`

### Testnet Deployment
1. Configure testnet in `hardhat.config.js`
2. Add private key to environment variables
3. Deploy: `npx hardhat run scripts/deploy.js --network <testnet>`

### Production Deployment
1. Configure mainnet in `hardhat.config.js`
2. Add production private key securely
3. Deploy: `npx hardhat run scripts/deploy.js --network mainnet`

## 🔧 Troubleshooting

### Common Issues

**"Contract not deployed" error:**
- Make sure you've deployed the contract first
- Check that the contract address is correct in your frontend

**"Network not found" error:**
- Ensure MetaMask is connected to the local network
- Verify the RPC URL and Chain ID

**"Insufficient funds" error:**
- Use the test accounts provided by Hardhat
- Each account has 10,000 ETH for testing

**Frontend not connecting:**
- Check that the local blockchain is running
- Verify MetaMask is connected to the correct network
- Ensure contract address is updated in frontend

### Reset Everything
```bash
# Stop the local blockchain (Ctrl+C)
# Delete cache and artifacts
rm -rf cache artifacts

# Restart local blockchain
npm run node

# Redeploy contract
npm run deploy:local
```

## 📚 Smart Contract Details

### Contract: PRAMANSupplyChain.sol

**Key Functions:**
- `createGenesisBatch()` - Create initial batch (Manufacturer only)
- `sendBatch()` - Send batch to next party (Distributor/Retailer)
- `receiveBatch()` - Receive batch (Distributor/Retailer)
- `getBatchHistory()` - Get complete batch history
- `getUserBatches()` - Get batches for specific user

**Events:**
- `GenesisBatchCreated` - When a new batch is created
- `BatchSent` - When a batch is sent
- `BatchReceived` - When a batch is received

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure the local blockchain is running
4. Check that MetaMask is properly configured
5. Review the troubleshooting section above

For additional help, please open an issue in the repository.

## 🔗 Links

- [Hardhat Documentation](https://hardhat.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Web3.js Documentation](https://web3js.readthedocs.io)
- [MetaMask Documentation](https://docs.metamask.io)

---

**Happy Coding! 🚀**
