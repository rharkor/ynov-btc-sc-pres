import { useState } from "react";
import { RemoteContext } from "./RemoteContext";
import RemoteContent from "../../components/RemoteContent";

export function RemoteProvider({
  children,
  conditionalContent,
}: {
  children: React.ReactNode;
  conditionalContent: React.ReactNode;
}) {
  const [isRemote, setIsRemote] = useState(false);
  const toggleIsRemote = () => setIsRemote(!isRemote);
  return (
    <RemoteContext.Provider value={{ isRemote, toggleIsRemote }}>
      {isRemote ? <RemoteContent /> : conditionalContent}
      {children}
    </RemoteContext.Provider>
  );
}
