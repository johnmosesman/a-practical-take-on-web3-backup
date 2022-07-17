import { useDappContext } from "~/hooks/useDappContext";

import ConnectWallet from "~/dc/connect-wallet";
import MyDinners from "~/components/my-dinners";
import { type Dinner, useMyDinners } from "~/hooks/useMyDinners";
import CreateDinner from "~/components/create-dinner";

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
          <MyDinners dinners={dinners} />
        </div>
      )}
    </div>
  );
}
