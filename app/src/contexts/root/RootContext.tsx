import { createContext } from "react";

export type RootContextType = {
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RootContext = createContext<RootContextType>({
  admin: false,
  setAdmin: () => {},
});
