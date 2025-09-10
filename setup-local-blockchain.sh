#!/bin/bash

echo "🚀 Setting up PRAMAN Supply Chain Local Blockchain Environment"
echo "=============================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Dependencies installed successfully"

# Compile contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

echo "✅ Smart contracts compiled successfully"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start local blockchain: npm run node"
echo "2. Deploy contract: npm run deploy:local"
echo "3. Test contract: npx hardhat run scripts/test-contract.js --network localhost"
echo "4. Start frontend: npm run frontend:dev"
echo ""
echo "📖 For detailed instructions, see README-BLOCKCHAIN-SETUP.md"
echo ""
echo "🔗 Local blockchain will run on: http://127.0.0.1:8545"
echo "⛓️  Chain ID: 31337"
echo "💰 Each test account has 10,000 ETH"
