import { useState, useEffect } from "react";
import { getDinners } from "~/lib/bento";

import { type DappContextType } from "./useDappContext";

export interface Dinner {
  name: string;
  price: number;
  balance: number;
}

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
