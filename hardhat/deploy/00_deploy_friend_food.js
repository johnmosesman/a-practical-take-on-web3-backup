const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying...");
  let deployed = await deploy("FriendFood", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("Verifying...");
  await hre.run("verify:verify", {
    address: deployed.address,
    constructorArguments: [],
  });
};
module.exports.tags = ["FriendFood"];
