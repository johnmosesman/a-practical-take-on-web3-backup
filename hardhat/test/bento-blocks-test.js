const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BentoBlocks", function () {
  let contract;

  beforeEach(async () => {
    const BentoBlocks = await ethers.getContractFactory("BentoBlocks");
    contract = await BentoBlocks.deploy();
    await contract.deployed();
  });

  describe("createDinner", () => {
    it("fails without sending a valid price", async () => {
      await expect(contract.createDinner("Sushi boat", 0)).to.be.revertedWith(
        "Invalid price"
      );
    });

    it("creates a new dinner", async () => {
      const [chef] = await ethers.getSigners();

      let price = ethers.utils.parseUnits("0.01", "ether");
      await expect(contract.connect(chef).createDinner("Sushi boat", price))
        .to.emit(contract, "DinnerCreated")
        .withArgs(chef.address, "Sushi boat", price);

      let dinner = await contract.dinners(chef.address);
      expect(dinner.name).to.eq("Sushi boat");
      expect(dinner.price).to.eq(price);

      expect((await contract.getHosts())[0]).to.eq(chef.address);
    });
  });

  describe("reserve", () => {
    let price = ethers.utils.parseUnits("0.01", "ether");

    beforeEach(async () => {
      const [chef] = await ethers.getSigners();

      await contract.connect(chef).createDinner("Sushi boat", price);
    });

    it("should fail if the dinner doesn't exist", async function () {
      await expect(
        contract.reserve(ethers.constants.AddressZero)
      ).to.be.revertedWith("Dinner doesn't exist");
    });

    it("should fail if they don't pay the correct price", async function () {
      const [chef] = await ethers.getSigners();

      await expect(
        contract.reserve(chef.address, { value: 0 })
      ).to.be.revertedWith("Payment required");
    });

    it("reserves your spot", async function () {
      const [chef, diner] = await ethers.getSigners();

      await expect(
        contract.connect(diner).reserve(chef.address, { value: price })
      )
        .to.emit(contract, "ReservationMade")
        .withArgs(chef.address, diner.address);

      let res = await contract.reservations(chef.address, 0);
      expect(res).to.eq(diner.address);
    });
  });

  describe("withdraw", () => {
    let price = ethers.utils.parseUnits("0.01", "ether");

    it("should fail if the dinner doesn't exist", async function () {
      await expect(contract.withdraw()).to.be.revertedWith(
        "Dinner doesn't exist"
      );
    });

    it("allows the chef to withdraw only once", async () => {
      const [chef, diner] = await ethers.getSigners();

      await contract.connect(chef).createDinner("Sushi boat", price);
      await contract.connect(diner).reserve(chef.address, { value: price });

      await expect(() =>
        contract.connect(chef).withdraw()
      ).to.changeEtherBalances([contract, chef], [`-${price}`, price]);

      await expect(contract.connect(chef).withdraw()).to.be.revertedWith(
        "No balance"
      );
    });
  });
});
