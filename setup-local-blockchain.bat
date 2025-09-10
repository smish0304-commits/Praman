@echo off
echo 🚀 Setting up PRAMAN Supply Chain Local Blockchain Environment
echo ==============================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

echo ✅ Dependencies installed successfully

REM Compile contracts
echo 🔨 Compiling smart contracts...
npx hardhat compile

echo ✅ Smart contracts compiled successfully

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Start local blockchain: npm run node
echo 2. Deploy contract: npm run deploy:local
echo 3. Test contract: npx hardhat run scripts/test-contract.js --network localhost
echo 4. Start frontend: npm run frontend:dev
echo.
echo 📖 For detailed instructions, see README-BLOCKCHAIN-SETUP.md
echo.
echo 🔗 Local blockchain will run on: http://127.0.0.1:8545
echo ⛓️  Chain ID: 31337
echo 💰 Each test account has 10,000 ETH

pause
