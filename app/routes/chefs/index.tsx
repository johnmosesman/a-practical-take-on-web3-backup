import { useDappContext } from "~/hooks/useDappContext";

import ConnectWallet from "~/dc/connect-wallet";
import MyDinners from "~/components/my-dinners";
import { type Dinner, useMyDinners } from "~/hooks/useMyDinners";
import CreateDinner from "~/components/create-dinner";
import { ethers, Signer } from "ethers";

import Abis from "hardhat/abis.json";

const withdraw = async (signer: Signer) => {
  console.log("withdraw");

  console.log(await signer.getAddress());

  let contract = new ethers.Contract(
    Abis["contracts"]["BentoBlocks"]["address"],
    Abis["contracts"]["BentoBlocks"]["abi"],
    signer
  );

  let result = await contract.withdraw();

  // todo: toast
  console.log("withdraw result:", result);
};

export default function Chefs() {
  let context = useDappContext();
  let { signer } = context;

  let dinners: Dinner[] = useMyDinners(context);

  return (
    <div className="flex flex-col max-w-xl">
      <h1 className="text-4xl mb-4">🧑‍🍳 Chefs</h1>

      {!signer && (
        <div>
          <p className="mb-2">Connect wallet to begin!</p>
          <ConnectWallet />
        </div>
      )}

      {signer && (
        <div className="flex flex-row justify-between">
          <CreateDinner signer={signer} />

          <div>
            <p className="text-2xl mb-4">My Dinners</p>

            <MyDinners dinners={dinners} />

            {dinners && dinners.length > 0 && (
              <button
                style={{
                  background:
                    "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
                }}
                className="px-3 py-2 rounded text-sm"
                onClick={async () => {
                  await withdraw(signer);
                }}
              >
                Withdraw 💰
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
