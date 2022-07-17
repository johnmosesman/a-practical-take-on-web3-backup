// import { useEffect } from "react";
// import { hooks, metaMask } from "~/connectors/meta-mask";
// const { useAccounts, useError, useIsActivating, useIsActive } = hooks;

import { ethers, Signer } from "ethers";
import { FormEvent } from "react";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/useWeb3Signer";

async function send({
  signer,
  toAddress,
  etherAmount,
}: {
  signer: Signer;
  toAddress: string;
  etherAmount: string;
}) {
  const tx = await signer.sendTransaction({
    to: toAddress,
    value: ethers.utils.parseEther(etherAmount),
  });
}

const submitForm = async ({
  e,
  signer,
}: {
  e: FormEvent<HTMLFormElement>;
  signer: Signer;
}) => {
  // @ts-ignore
  let toAddress: string = e.target.elements["to"].value;
  // @ts-ignore
  let etherAmount: string = e.target.elements["amount"].value;

  await send({ signer, toAddress, etherAmount });
};

export default function SendEth() {
  let provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm({ e, signer });
      }}
      className="box"
    >
      <div>
        <div>To</div>
        <div>
          <input className="border py-1 px-3" name="to" />
        </div>
      </div>
      <div>
        <div>Amount</div>
        <div>
          <input className="border py-1 px-3" name="amount" />
        </div>
      </div>

      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
