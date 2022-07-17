import { Link } from "@remix-run/react";
import { useDappContext } from "~/hooks/useDappContext";
import { useDappData } from "~/hooks/useDappData";

export default function Index() {
  const purpose = null;

  let dappContext = useDappContext();
  let { balance } = useDappData(dappContext);

  return (
    <div>
      <div className="my-8 mx-4">
        <span className="mr-2">📝</span>
        This Is Your App Home. You can start editing it in{" "}
        <span className="font-bold">app/routes/index.jsx</span>
      </div>
      <div className="my-8 mx-4">
        <span className="mr-2">✏️</span>
        Edit your smart contract{" "}
        <span className="font-bold">YourContract.sol</span> in{" "}
        <span className="font-bold">/hardhat/contracts</span>
      </div>
      {!purpose ? (
        <div className="my-8 mx-4">
          <span className="mr-2">👷‍♀️</span>
          You haven't deployed your contract yet, run
          <span className="font-bold"> npm run chain</span> and{" "}
          <span className="font-bold"> npm run deploy</span> to deploy your
          first contract!
        </div>
      ) : (
        <div className="my-8 mx-4">
          <span className="mr-2">🤓</span>
          The "purpose" variable from your contract is{" "}
          <span className="font-bold">{purpose}</span>
        </div>
      )}

      <div className="my-8 mx-4">
        <span className="mr-2">🤖</span>
        An example prop of your balance{" "}
        <span style={{ fontWeight: "bold", color: "green" }}>
          ({balance})
        </span>{" "}
      </div>
      <div className="my-8 mx-4">
        <span className="mr-2">💭</span>
        Check out the <Link to="/hints">"Hints"</Link> tab for more tips.
      </div>
      <div className="my-8 mx-4">
        <span className="mr-2">🛠</span>
        Tinker with your smart contract using the{" "}
        <Link to="/debug">"Debug Contract"</Link> tab.
      </div>
    </div>
  );
}
