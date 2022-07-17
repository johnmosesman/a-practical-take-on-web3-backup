import { NavLink } from "@remix-run/react";
import ConnectWallet from "../dc/connect-wallet";

const navLinks: {
  label: string;
  href: string;
}[] = [
  {
    label: "App Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
  },
  {
    label: "Hints",
    href: "/hints",
  },
  {
    label: "Example UI",
    href: "/exampleui",
  },
  {
    label: "Mainnet Dai",
    href: "/mainnetdai",
  },
  {
    label: "Subgraph",
    href: "/subgraph",
  },
];

export default function Header() {
  return (
    <div>
      <div className="contianer p-4">
        <div className="flex justify-between" data-testid="header">
          <div>
            <div className="text-xl">
              🏗 Scaffold-Eth <> 🎤 Remix</>
            </div>
            <div className="text-gray-400 text-sm">
              Remix.Run ++ Ethereum dev stack focused on fast product iteration.
            </div>
          </div>
          <div>
            <ConnectWallet />
          </div>
        </div>
      </div>
      <div className="contianer p-4 pb-0 border-b border-b-gray-200 flex -ml-4">
        {navLinks.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            style={{
              marginBottom: -1,
            }}
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-blue-300 border-b-2 border-b-blue-300 py-4 mx-3 block"
                : "py-4 mx-3 block"
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
