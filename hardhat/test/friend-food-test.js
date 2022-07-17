const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FriendFood", function () {
  let contract;

  beforeEach(async () => {
    const FriendFood = await ethers.getContractFactory("FriendFood");
    contract = await FriendFood.deploy();
    await contract.deployed();
  });

  describe("createDinner", () => {
    it("fails without sending a valid price", async () => {
      await expect(contract.createDinner("Sushi boat", 0)).to.be.revertedWith(
        "Invalid price"
      );
    });

    it("creates a new dinner", async () => {
      const [addr1] = await ethers.getSigners();

      let price = ethers.utils.parseUnits("0.01", "ether");
      await expect(contract.connect(addr1).createDinner("Sushi boat", price))
        .to.emit(contract, "DinnerCreated")
        .withArgs(addr1.address, "Sushi boat", price);

      let dinner = await contract.dinners(addr1.address);
      expect(dinner.name).to.eq("Sushi boat");
      expect(dinner.price).to.eq(price);
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
});
