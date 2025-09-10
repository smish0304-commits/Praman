# PRAMAN Supply Chain - Local Blockchain Setup

This guide will help you set up and test the PRAMAN Supply Chain smart contract on a local blockchain using Hardhat.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Install Hardhat and dependencies:**
```bash
npm install
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
cd ..
```

## Local Blockchain Setup

### Step 1: Start Local Blockchain

```bash
# Start Hardhat local blockchain
npm run node
```

This will start a local blockchain on `http://127.0.0.1:8545` with 20 test accounts, each with 10,000 ETH.

### Step 2: Deploy Contract

In a new terminal:

```bash
# Deploy contract to local blockchain
npm run deploy:local
```

This will deploy the PRAMAN Supply Chain contract and display the contract address.

### Step 3: Test Contract

```bash
# Test the deployed contract
npx hardhat run scripts/test-contract.js --network localhost
```

## Frontend Integration

### Step 1: Update Contract Configuration

After deployment, update your frontend configuration:

1. **Copy the contract address** from the deployment output
2. **Update `frontend/src/utils/web3Service.js`** with the contract address
3. **Add the contract ABI** (generated in `artifacts/contracts/PRAMANSupplyChain.sol/PRAMANSupplyChain.json`)

### Step 2: Start Frontend

```bash
# Start the frontend development server
npm run frontend:dev
```

## Testing the Complete System

### 1. Create Genesis Batch
- Connect MetaMask to local network (`http://127.0.0.1:8545`)
- Import one of the test accounts (private keys are displayed when you run `npm run node`)
- Create a genesis batch through the frontend

### 2. Send Batch
- Use a different test account (distributor)
- Send the batch to another account

### 3. Receive Batch
- Use the recipient account
- Receive the batch

### 4. View Transaction History
- Check the complete transaction history
- Verify all events are recorded

## Network Configuration

### Local Network (Hardhat)
- **RPC URL:** `http://127.0.0.1:8545`
- **Chain ID:** `31337`
- **Currency:** ETH (test)

### MetaMask Setup
1. Open MetaMask
2. Click on network dropdown
3. Select "Add Network"
4. Enter:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

## Test Accounts

When you run `npm run node`, you'll see 20 test accounts with private keys. Use these for testing:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

## Troubleshooting

### Common Issues

1. **"Contract not deployed" error:**
   - Make sure you've deployed the contract first
   - Check that the contract address is correct in your frontend

2. **"Network not found" error:**
   - Ensure MetaMask is connected to the local network
   - Verify the RPC URL and Chain ID

3. **"Insufficient funds" error:**
   - Use the test accounts provided by Hardhat
   - Each account has 10,000 ETH for testing

### Reset Everything

```bash
# Stop the local blockchain
# Delete cache and artifacts
rm -rf cache artifacts

# Restart local blockchain
npm run node

# Redeploy contract
npm run deploy:local
```

## Next Steps

Once local testing is complete:

1. **Test on Testnet** (Sepolia, Goerli, etc.)
2. **Deploy to Mainnet** (when ready for production)
3. **Implement real-time monitoring**
4. **Add advanced analytics**

## File Structure

```
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Dependencies and scripts
├── scripts/
│   ├── deploy.js             # Contract deployment script
│   └── test-contract.js      # Contract testing script
├── frontend/
│   ├── contracts/
│   │   └── PRAMANSupplyChain.sol  # Smart contract
│   └── src/
│       └── utils/
│           ├── apiServices.js      # API functions
│           └── web3Service.js      # Web3 integration
└── README-BLOCKCHAIN-SETUP.md     # This file
```

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure the local blockchain is running
4. Check that MetaMask is properly configured
