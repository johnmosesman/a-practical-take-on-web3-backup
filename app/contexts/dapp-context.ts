import { createContext } from "react";

// TODO: Move somewhere better
import { DappContextType } from "~/hooks/useDappContext";

// We must initialize this context with a proper TenderContextType to avoid
// Runtime errors
export const DappContext = createContext<DappContextType>(
  {} as DappContextType
);
