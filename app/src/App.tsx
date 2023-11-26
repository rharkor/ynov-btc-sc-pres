import { ThemeSwitcher } from "./components/ThemeSwitcher";

import { RemoteProvider } from "./contexts/remote/RemoteProvider";
import Footer from "./components/Footer";
import Slides from "./components/Slides";
import { useContext } from "react";
import { FullScreenContext } from "./contexts/fullscreen/FullScreenContext";

function App() {
  const { isFullScreen } = useContext(FullScreenContext);

  return (
    <main className="min-h-screen overflow-hidden">
      <RemoteProvider conditionalContent={<Slides />}>
        <Footer />
      </RemoteProvider>
      {!isFullScreen && <ThemeSwitcher />}
    </main>
  );
}

export default App;
