import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "~/components/header";
import SendEth from "~/components/send-eth";
import { DappContext } from "./contexts/dapp-context";
import { useDappContext } from "./hooks/useDappContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New ScaffodlEth<>Remix App",
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
        <Header />
        {/* How do we connect  */}
        {dappContextData && (
          <DappContext.Provider value={dappContextData}>
            <Outlet />
            <SendEth />
          </DappContext.Provider>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
