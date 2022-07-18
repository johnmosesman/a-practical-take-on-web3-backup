import { Link } from "@remix-run/react";
import { useDappContext } from "~/hooks/useDappContext";
import { useDappData } from "~/hooks/useDappData";

export default function Index() {
  const purpose = null;

  let dappContext = useDappContext();
  let { balance } = useDappData(dappContext);

  return (
    <div className="mx-auto max-w-xl m-8">
      <h1 className="text-3xl mb-2">BentoBlocks™ 🍣</h1>

      <div>
        <Link className="mr-4 underline" to="/chefs">
          Chefs 🍳
        </Link>
        <Link className="underline" to="/diners">
          Diners 🍽
        </Link>
      </div>
    </div>
  );
}
