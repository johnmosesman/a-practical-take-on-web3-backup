import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DappContext } from "./contexts/dapp-context";
import ConnectWallet from "./dc/connect-wallet";
import { useDappContext } from "./hooks/useDappContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "BentoBlocks™ 🍱",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  let dappContextData = useDappContext();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div className="mx-auto max-w-xl m-8">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl mb-2">BentoBlocks™ 🍱</h1>
            <ConnectWallet />
          </div>

          <div className="mb-24">
            <Link className="mr-4 underline" to="/chefs">
              Chefs 🧑‍🍳
            </Link>
            <Link className="underline" to="/diners">
              Diners 🍽
            </Link>
          </div>

          {/* How do we connect  */}
          {dappContextData && (
            <DappContext.Provider value={dappContextData}>
              <Outlet />
            </DappContext.Provider>
          )}
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
