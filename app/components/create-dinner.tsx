import { type Signer } from "ethers";
import { useState } from "react";
import { createDinner } from "~/lib/bento";

interface CreateDinnerProps {
  signer: Signer;
}

export default function CreateDinner(props: CreateDinnerProps) {
  let defaultName = "Sushi Town";
  let defaultPrice = "0.01";

  let { signer } = props;

  let [name, setName] = useState<string>(defaultName);
  let [price, setPrice] = useState<string>(defaultPrice);

  return (
    <div className="flex flex-col">
      <p className="text-2xl mb-4">Create a dinner</p>

      <p className="text-gray-600 text-sm">Dinner name</p>

      <form className="flex flex-col ">
        <input
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded mb-4 p-2"
          defaultValue={defaultName}
          placeholder="Sushi Town 🍣"
        />

        <p className="text-gray-600 text-sm">Price per person in ETH</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded mb-4 p-2"
          defaultValue={defaultPrice}
          placeholder="0.01 ETH"
        />

        <button
          style={{
            background: "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
          }}
          className="p-4 rounded"
          onClick={async (e) => {
            e.preventDefault();
            await createDinner(signer, name, price);
          }}
        >
          Create Dinner 🍳
        </button>
      </form>
    </div>
  );
}
