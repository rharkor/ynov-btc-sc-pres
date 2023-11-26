import { createContext } from "react";

export type RemoteContextType = {
  isRemote: boolean;
  toggleIsRemote: () => void;
};

export const RemoteContext = createContext<RemoteContextType>({
  isRemote: false,
  toggleIsRemote: () => {},
});
