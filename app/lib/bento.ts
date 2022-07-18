import { ethers, Signer } from "ethers";

import Abis from "hardhat/abis.json";
import { type Dinner } from "~/hooks/useMyDinners";

export const createDinner = async (
  signer: Signer,
  name: string,
  price: string
) => {
  console.log("createDinner");

  console.log(await signer.getAddress(), name, price);

  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let formattedPrice = ethers.utils.parseUnits(price, "ether");
  console.log("formattedPrice", formattedPrice.toString());

  let result = await contract.createDinner(name, formattedPrice);

  // todo: toast
  console.log("CreateDinner result:", result);
};

export const getDinners = async (signer: Signer): Promise<Dinner[]> => {
  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let chefAddress: string = await signer.getAddress();
  let result = await contract.dinners(chefAddress);

  console.log("result", result);

  if (result.price.toString() === "0") {
    return [];
  }

  return [
    {
      name: result.name,
      price: parseFloat(ethers.utils.formatUnits(result.price, "ether")),
      balance: parseFloat(ethers.utils.formatUnits(result.balance, "ether")),
    },
  ];
};

export const reserve = async (
  signer: Signer,
  address: string,
  price: number
) => {
  console.log("reserve");

  console.log(await signer.getAddress(), address);

  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let formattedPrice = ethers.utils.parseUnits(price.toString(), "ether");
  console.log("formattedPrice", formattedPrice.toString());

  let result = await contract.reserve(address, { value: formattedPrice });

  // todo: toast
  console.log("reserve result:", result);
};
