import { Link } from "@remix-run/react";
import { ethers, Signer } from "ethers";
import MyDinners from "~/components/my-dinners";
import ConnectWallet, { truncateAddress } from "~/dc/connect-wallet";
import { useDappContext } from "~/hooks/useDappContext";
import { useDappData } from "~/hooks/useDappData";
import { useGetHosts } from "~/hooks/useGetHosts";

import Abis from "hardhat/abis.json";

const reserve = async (signer: Signer, address: string, price: number) => {
  console.log("reserve");

  console.log(await signer.getAddress(), address);

  let contract = new ethers.Contract(
    Abis["contracts"]["FriendFood"]["address"],
    Abis["contracts"]["FriendFood"]["abi"],
    signer
  );

  let formattedPrice = ethers.utils.parseUnits(price.toString(), "ether");
  console.log("formattedPrice", formattedPrice.toString());

  let result = await contract.reserve(address, { value: formattedPrice });

  // todo: toast
  console.log("reserve result:", result);
};

export default function Diners() {
  let dappContext = useDappContext();
  let signer = dappContext.signer;

  let hosts = useGetHosts(dappContext);

  return (
    <div>
      <h1 className="text-4xl mb-4">Diners 🍽</h1>

      <p className="text-2xl mb-4">Hosts</p>

      {!signer && (
        <div>
          <p className="mb-2">Connect wallet to begin!</p>
          <ConnectWallet />
        </div>
      )}

      {signer &&
        hosts.map((host, i) => {
          return (
            <div key={i}>
              <p className="mb-4">{truncateAddress(host.address)}</p>
              <MyDinners dinners={host.dinners} />

              <button
                style={{
                  background:
                    "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
                }}
                className="px-3 py-2 rounded text-sm"
                onClick={async () => {
                  await reserve(signer, host.address, host.dinners[0].price);
                }}
              >
                Reserve ✍️
              </button>
            </div>
          );
        })}
    </div>
  );
}
