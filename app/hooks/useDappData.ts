import { useState, useEffect } from "react";
import { useBalance } from "./useBalance";
import { DappContextType } from "./useDappContext";

interface DappDataType {
  balance: number;
}

function getDefaultDappData() {
  return {
    balance: 0,
  };
}

export function useDappData(dappContext: DappContextType): DappDataType {
  let [dappData, setDappData] = useState<DappDataType>(getDefaultDappData());
  let balance = 0; //useBalance(dappContext);

  useEffect(() => {
    /**
     * Can we provide a set of hooks from here that
     * are appropriately connected to provider / signer?
     *
     * */
    setDappData({
      balance,
    });
  }, [balance]);

  return dappData;
}
