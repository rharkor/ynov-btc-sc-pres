import { createContext } from "react";

export type FullScreenContextType = {
  isFullScreen: boolean;
  toggleIsFullScreen: () => void;
};

export const FullScreenContext = createContext<FullScreenContextType>({
  isFullScreen: false,
  toggleIsFullScreen: () => {},
});
