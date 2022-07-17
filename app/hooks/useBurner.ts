import { useBurnerSigner } from "eth-hooks";
import { useEthersAppContext } from "eth-hooks/context";
import { useEffect } from "react";

// import { IScaffoldAppProviders } from "../../models/IScaffoldAppProviders";
import {
  TCreateEthersModalConnector,
  TEthersAdaptor,
  TEthersProvider,
  TNetworkInfo,
} from "eth-hooks/models";

interface IScaffoldAppProviders {
  currentProvider: TEthersProvider | undefined;
  targetNetwork: TNetworkInfo;
  mainnetAdaptor: TEthersAdaptor | undefined;
  localAdaptor: TEthersAdaptor | undefined;
}

// import { NETWORKS } from '~common/constants/networks';
const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    url: "http://localhost:8545",
  },
};

export const useBurnerFallback = (
  appProviders: IScaffoldAppProviders,
  enable: boolean
): void => {
  const ethersAppContext = useEthersAppContext();
  const burnerFallback = useBurnerSigner(appProviders.localAdaptor?.provider);
  const localAddress = appProviders.localAdaptor?.signer;

  useEffect(() => {
    /**
     * if the current provider is local provider then use the burner fallback
     */
    if (
      burnerFallback?.signer &&
      burnerFallback?.account !== ethersAppContext.account &&
      ethersAppContext.chainId === NETWORKS.localhost.chainId &&
      ethersAppContext.provider?.connection?.url === NETWORKS.localhost.url &&
      ethersAppContext.changeSigner &&
      localAddress != null &&
      enable
    ) {
      void ethersAppContext.changeSigner?.(burnerFallback.signer);
    }
  }, [
    ethersAppContext.account,
    localAddress,
    ethersAppContext.changeSigner,
    burnerFallback.signer,
    burnerFallback?.account,
    ethersAppContext,
    enable,
  ]);
};
