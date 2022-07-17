import { Link } from "@remix-run/react";
import { useDappContext } from "~/hooks/useDappContext";
import { useDappData } from "~/hooks/useDappData";

export default function Diners() {
  let dappContext = useDappContext();
  let { balance } = useDappData(dappContext);

  return <div>diners</div>;
}
