const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PRAMAN Supply Chain", function () {
  let pramanSupplyChain;
  let owner, farmer, distributor, consumer;

  beforeEach(async function () {
    // Get signers
    [owner, farmer, distributor, consumer] = await ethers.getSigners();

    // Deploy contract
    const PRAMANSupplyChain = await ethers.getContractFactory("PRAMANSupplyChain");
    pramanSupplyChain = await PRAMANSupplyChain.deploy();
    await pramanSupplyChain.waitForDeployment();
  });

  describe("User Registration", function () {
    it("Should register a farmer", async function () {
      await pramanSupplyChain.connect(farmer).registerUser(
        "John Farmer",
        "john@farmer.com",
        "FARM001",
        "farmer"
      );

      const user = await pramanSupplyChain.getUser(farmer.address);
      expect(user.name).to.equal("John Farmer");
      expect(user.role).to.equal("farmer");
      expect(user.exists).to.be.true;
    });

    it("Should register a distributor", async function () {
      await pramanSupplyChain.connect(distributor).registerUser(
        "Jane Distributor",
        "jane@distributor.com",
        "DIST001",
        "distributor"
      );

      const user = await pramanSupplyChain.getUser(distributor.address);
      expect(user.name).to.equal("Jane Distributor");
      expect(user.role).to.equal("distributor");
    });

    it("Should register a consumer", async function () {
      await pramanSupplyChain.connect(consumer).registerUser(
        "Bob Consumer",
        "bob@consumer.com",
        "CONS001",
        "consumer"
      );

      const user = await pramanSupplyChain.getUser(consumer.address);
      expect(user.name).to.equal("Bob Consumer");
      expect(user.role).to.equal("consumer");
    });
  });

  describe("Batch Creation", function () {
    beforeEach(async function () {
      // Register farmer first
      await pramanSupplyChain.connect(farmer).registerUser(
        "John Farmer",
        "john@farmer.com",
        "FARM001",
        "farmer"
      );
    });

    it("Should create a genesis batch", async function () {
      const batchId = "FARM001-1703123456-ASH";
      const signatureHash = "0x" + "a".repeat(64);

      await pramanSupplyChain.connect(farmer).createGenesisBatch(
        batchId,
        "Ashwagandha",
        "100",
        "Premium",
        "Excellent",
        "Low",
        "123456789",
        "987654321",
        "Farm Location, India",
        "50",
        "60",
        "25",
        "10",
        "1013",
        signatureHash
      );

      const batch = await pramanSupplyChain.getBatch(batchId);
      expect(batch.batchId).to.equal(batchId);
      expect(batch.cropName).to.equal("Ashwagandha");
      expect(batch.status).to.equal("created");
      expect(batch.supplyChainStage).to.equal("genesis");
    });

    it("Should emit BatchCreated event", async function () {
      const batchId = "FARM001-1703123456-ASH";
      const signatureHash = "0x" + "a".repeat(64);

      await expect(
        pramanSupplyChain.connect(farmer).createGenesisBatch(
          batchId,
          "Ashwagandha",
          "100",
          "Premium",
          "Excellent",
          "Low",
          "123456789",
          "987654321",
          "Farm Location, India",
          "50",
          "60",
          "25",
          "10",
          "1013",
          signatureHash
        )
      ).to.emit(pramanSupplyChain, "BatchCreated")
        .withArgs(batchId, farmer.address, "FARM001", "Ashwagandha", anyValue, anyValue);
    });
  });

  describe("Batch Transfer", function () {
    let batchId;

    beforeEach(async function () {
      // Register users
      await pramanSupplyChain.connect(farmer).registerUser(
        "John Farmer",
        "john@farmer.com",
        "FARM001",
        "farmer"
      );

      await pramanSupplyChain.connect(distributor).registerUser(
        "Jane Distributor",
        "jane@distributor.com",
        "DIST001",
        "distributor"
      );

      // Create batch
      batchId = "FARM001-1703123456-ASH";
      const signatureHash = "0x" + "a".repeat(64);

      await pramanSupplyChain.connect(farmer).createGenesisBatch(
        batchId,
        "Ashwagandha",
        "100",
        "Premium",
        "Excellent",
        "Low",
        "123456789",
        "987654321",
        "Farm Location, India",
        "50",
        "60",
        "25",
        "10",
        "1013",
        signatureHash
      );
    });

    it("Should send batch from farmer to distributor", async function () {
      await pramanSupplyChain.connect(farmer).sendBatch(
        batchId,
        "DIST001",
        "Truck",
        "0x" + "b".repeat(64)
      );

      const batch = await pramanSupplyChain.getBatch(batchId);
      expect(batch.status).to.equal("in_transit");
      expect(batch.nextActor).to.equal("DIST001");
    });

    it("Should receive batch by distributor", async function () {
      // First send the batch
      await pramanSupplyChain.connect(farmer).sendBatch(
        batchId,
        "DIST001",
        "Truck",
        "0x" + "b".repeat(64)
      );

      // Then receive it
      await pramanSupplyChain.connect(distributor).receiveBatch(
        batchId,
        "Quality check passed",
        "0x" + "c".repeat(64)
      );

      const batch = await pramanSupplyChain.getBatch(batchId);
      expect(batch.status).to.equal("received");
      expect(batch.nextActor).to.equal("");
    });
  });

  describe("Batch Queries", function () {
    beforeEach(async function () {
      // Register farmer
      await pramanSupplyChain.connect(farmer).registerUser(
        "John Farmer",
        "john@farmer.com",
        "FARM001",
        "farmer"
      );

      // Create multiple batches
      for (let i = 0; i < 3; i++) {
        const batchId = `FARM001-170312345${i}-ASH`;
        const signatureHash = "0x" + "a".repeat(64);

        await pramanSupplyChain.connect(farmer).createGenesisBatch(
          batchId,
          "Ashwagandha",
          "100",
          "Premium",
          "Excellent",
          "Low",
          "123456789",
          "987654321",
          "Farm Location, India",
          "50",
          "60",
          "25",
          "10",
          "1013",
          signatureHash
        );
      }
    });

    it("Should get all batches", async function () {
      const allBatches = await pramanSupplyChain.getAllBatches();
      expect(allBatches.length).to.equal(3);
    });

    it("Should get batches by status", async function () {
      const createdBatches = await pramanSupplyChain.getBatchesByStatus("created");
      expect(createdBatches.length).to.equal(3);
    });
  });
});
