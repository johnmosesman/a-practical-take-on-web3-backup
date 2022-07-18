import { useDappContext } from "~/hooks/useDappContext";

import ConnectWallet from "~/dc/connect-wallet";
import MyDinners from "~/components/my-dinners";
import { type Dinner, useMyDinners } from "~/hooks/useMyDinners";
import CreateDinner from "~/components/create-dinner";
import { ethers, Signer } from "ethers";
import toast from "react-hot-toast";

import type { TransactionReceipt } from "@ethersproject/providers";
import Abis from "hardhat/abis.json";
import { Txn, withdraw } from "~/lib/bento";

export default function Chefs() {
  let context = useDappContext();
  let { signer, updateTransaction } = context;

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
          <CreateDinner context={context} />

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
                  let txn: Txn = await withdraw(signer);
                  let tr: TransactionReceipt = await txn.wait();

                  updateTransaction(tr.blockHash);
                  toast.success("Withdrawn!");
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
