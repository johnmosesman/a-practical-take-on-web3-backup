import { ethers, Signer } from "ethers";
import { useState, useEffect } from "react";
import { DappContextType } from "./useDappContext";
import { Dinner } from "./useMyDinners";

import Abis from "hardhat/abis.json";

interface Host {
  address: string;
  dinners: Dinner[];
}

const getDinnersForHost = async (
  signer: Signer,
  address: string
): Promise<Dinner[]> => {
  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let result = await contract.dinners(address);

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

const getHosts = async (signer: Signer): Promise<Host[]> => {
  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let hostsResult = await contract.getHosts();

  let results = hostsResult.map(async (hostAddress: string) => {
    return {
      address: hostAddress,
      dinners: await getDinnersForHost(signer, hostAddress),
    };
  });

  return await Promise.all(results);
};

export function useGetHosts(dappContext: DappContextType) {
  let { signer } = dappContext;

  let [hosts, setHosts] = useState<Host[]>([]);

  useEffect(() => {
    if (!signer) {
      return;
    }

    getHosts(signer).then((hs) => setHosts(hs));
  }, [signer]);

  return hosts;
}
