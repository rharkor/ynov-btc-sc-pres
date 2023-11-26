import { useEffect, useState } from "react";
import { FullScreenContext } from "./FullScreenContext";

export function FullScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleIsFullScreen = () => setIsFullScreen(!isFullScreen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, toggleIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
}
