import { ethers, Signer } from "ethers";
import { useState, useEffect } from "react";
import { DappContextType } from "./useDappContext";

async function getBalance({
  signer,
  provider,
}: {
  signer: Signer;
  provider: ethers.providers.Web3Provider;
}): Promise<number> {
  let address = await signer.getAddress();
  let bnBalance = await provider.getBalance(address);
  return parseFloat(ethers.utils.formatUnits(bnBalance, 18));
}

export function useBalance(dappContext: DappContextType) {
  let [balance, setBalance] = useState<number>(0);
  let { signer, provider } = dappContext;

  useEffect(() => {
    console.log(signer, provider);
    if (!signer || !provider) {
      return;
    }

    getBalance({ signer, provider }).then((b) => setBalance(b));
  }, [signer, provider]);

  return balance;
}
