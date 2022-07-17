import { type Dinner } from "~/hooks/useMyDinners";

interface MyDinnerProps {
  dinners: Dinner[];
}

export default function MyDinners(props: MyDinnerProps) {
  let { dinners } = props;

  console.log("dinners", dinners);

  return (
    <div>
      <p className="text-2xl mb-4">My Dinners</p>

      {dinners &&
        dinners.length > 0 &&
        dinners.map((dinner, i) => {
          return (
            <div
              key={i}
              className="border-b border-gray-300 pb-4 flex flex-row items-center justify-between"
            >
              <div>
                <p className="text-xl mb-0">{dinner.name}</p>
                <p className="mb-0">
                  <span className="font-semibold">{dinner.balance} ETH </span>
                </p>
                <p className="text-sm text-gray-600">
                  {dinner.price} ETH per person
                </p>
              </div>

              {dinner.balance > 0 && (
                <div>
                  <button
                    style={{
                      background:
                        "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
                    }}
                    className="px-3 py-2 rounded text-sm"
                    onClick={async () => {
                      // await createDinner(signer, name, price);
                    }}
                  >
                    Withdraw 💰
                  </button>
                </div>
              )}
            </div>
          );
        })}

      {(!dinners || dinners.length === 0) && (
        <p>No dinners yet! Why don't you create one?</p>
      )}
    </div>
  );
}
