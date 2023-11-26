import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { RootProvider } from "./contexts/root/RootProvider.tsx";
import { SlideProvider } from "./contexts/slide/SlideProvider.tsx";
import { FullScreenProvider } from "./contexts/fullscreen/FullScreenProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <RootProvider>
          <SlideProvider>
            <FullScreenProvider>
              <App />
            </FullScreenProvider>
          </SlideProvider>
        </RootProvider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
);
