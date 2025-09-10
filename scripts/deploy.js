const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting PRAMAN Supply Chain deployment...");

  // Get the contract factory
  const PRAMANSupplyChain = await ethers.getContractFactory("PRAMANSupplyChain");
  
  // Deploy the contract
  console.log("📦 Deploying PRAMAN Supply Chain contract...");
  const pramanSupplyChain = await PRAMANSupplyChain.deploy();
  
  // Wait for deployment to complete
  await pramanSupplyChain.waitForDeployment();
  
  const contractAddress = await pramanSupplyChain.getAddress();
  
  console.log("✅ PRAMAN Supply Chain deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Network:", network.name);
  console.log("⛓️  Chain ID:", network.config.chainId);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.config.chainId,
    deployedAt: new Date().toISOString(),
    deployer: await pramanSupplyChain.owner()
  };
  
  console.log("\n📋 Deployment Information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Verify deployment by calling a view function
  try {
    const batchCount = await pramanSupplyChain.getBatchCount();
    const userCount = await pramanSupplyChain.getUserCount();
    console.log("\n🔍 Contract Verification:");
    console.log("📊 Initial Batch Count:", batchCount.toString());
    console.log("👥 Initial User Count:", userCount.toString());
    console.log("✅ Contract is working correctly!");
  } catch (error) {
    console.error("❌ Contract verification failed:", error.message);
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("💡 Next steps:");
  console.log("1. Update your frontend with the contract address:", contractAddress);
  console.log("2. Update your frontend with the contract ABI");
  console.log("3. Test the contract functions");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
