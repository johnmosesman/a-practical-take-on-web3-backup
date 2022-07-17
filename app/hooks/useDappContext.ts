import { Web3ReactHooks } from "@web3-react/core";
import { useState, useEffect } from "react";
import { hooks as web3Hooks } from "~/connectors/meta-mask";
import { useDappData } from "./useDappData";
// import { useInterval } from "./use-interval";
import { useWeb3Signer } from "./useWeb3Signer";

export interface DappContextType {
  signer: ReturnType<typeof useWeb3Signer>;
  provider: ReturnType<typeof web3Hooks.useProvider>;
  web3Hooks: Web3ReactHooks;
  updateTransaction: Function;
  dappData: any; // TODO: define structure here
}

/**
 * Think of this as your web3 garage.
 *
 * - signer / provider available at top level
 *
 * - dappData as a collection of all global dapp data
 *
 * - Reloading logic for if things change on chain or if user
 *    changes account / network / etc (wip)
 *
 * - Access to hooks from https://github.com/NoahZinsmeister/web3-react
 *
 * @returns
 */
export function useDappContext() {
  let [currentTransaction, updateTransaction] = useState<string | null>(null);
  const chainId = web3Hooks.useChainId();
  let provider = web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  let [dappContext, setDappContext] = useState<DappContextType>({
    signer,
    provider,
    web3Hooks,
    updateTransaction,
    dappData: {},
  });

  let dappData = useDappData(dappContext || ({} as DappContextType)); // TODO: do something better

  // TODO:
  //  Block polling or eventing
  //   let pollingKey = useInterval(10_000);

  useEffect(() => {
    if (!signer || !chainId || !provider) {
      return;
    }

    setDappContext({
      signer,
      provider,
      web3Hooks,
      updateTransaction,
      dappData,
    });
  }, [
    signer,
    provider,
    web3Hooks,
    updateTransaction,
    // pollingKey,
    chainId, // Rerun if chain updates
    currentTransaction,
  ]);

  return dappContext;
}
