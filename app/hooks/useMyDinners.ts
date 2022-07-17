import { ethers, type Signer } from "ethers";
import { useState, useEffect } from "react";

import Abis from "hardhat/abis.json";
import { type DappContextType } from "./useDappContext";

export interface Dinner {
  name: string;
  price: number;
  balance: number;
}

const getDinners = async (signer: Signer): Promise<Dinner[]> => {
  let contract = new ethers.Contract(
    Abis["contracts"]["FriendFood"]["address"],
    Abis["contracts"]["FriendFood"]["abi"],
    signer
  );

  let chefAddress: string = await signer.getAddress();
  let result = await contract.dinners(chefAddress);

  return [
    {
      name: result.name,
      price: parseFloat(ethers.utils.formatUnits(result.price, "ether")),
      balance: parseFloat(ethers.utils.formatUnits(result.balance, "ether")),
    },
  ];
};

export function useMyDinners(dappContext: DappContextType) {
  let { signer } = dappContext;

  let [dinners, setDinners] = useState<Dinner[]>([]);

  useEffect(() => {
    if (!signer) {
      return;
    }

    getDinners(signer).then((ds) => setDinners(ds));
  }, [signer]);

  return dinners;
}
