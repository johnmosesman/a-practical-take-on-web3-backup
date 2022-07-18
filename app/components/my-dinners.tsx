import { type Dinner } from "~/hooks/useMyDinners";

interface MyDinnerProps {
  dinners: Dinner[];
}

export default function MyDinners(props: MyDinnerProps) {
  let { dinners } = props;

  return (
    <div>
      {dinners &&
        dinners.length > 0 &&
        dinners.map((dinner, i) => {
          return (
            <div
              key={i}
              className="pb-4 flex flex-row items-center justify-between"
            >
              <div>
                <p className="text-xl mb-0">{dinner.name}</p>
                <p className="mb-0">
                  <span className="font-semibold">
                    {dinner.balance} ETH paid
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  {dinner.price} ETH per person
                </p>
              </div>
            </div>
          );
        })}

      {(!dinners || dinners.length === 0) && (
        <p>No dinners yet! Why don't you create one?</p>
      )}
    </div>
  );
}
