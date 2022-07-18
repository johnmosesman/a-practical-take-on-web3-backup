import MyDinners from "~/components/my-dinners";
import ConnectWallet, { truncateAddress } from "~/dc/connect-wallet";
import { useDappContext } from "~/hooks/useDappContext";
import { useGetHosts } from "~/hooks/useGetHosts";

import { reserve } from "~/lib/bento";

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
