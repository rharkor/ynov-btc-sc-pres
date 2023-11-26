import { useCallback, useContext, useEffect, useState } from "react";
import { SlideContext } from "./SlideContext";
import { socket } from "../../lib/socket";
import { RootContext } from "../root/RootContext";
import { controlledByRoot } from "../../config";

export function SlideProvider({ children }: { children: React.ReactNode }) {
  const { admin } = useContext(RootContext);
  const [slide, _setSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);

  const emitSlideChange = useCallback(
    (slide: number) => {
      if (!admin || !controlledByRoot) return;
      localStorage.setItem("slide", slide.toString());
      const body = {
        slide,
        password: localStorage.getItem("adminPassword"),
      };
      socket.emit("slide", JSON.stringify(body));
    },
    [admin]
  );

  const setSlide = useCallback(
    (slide: number) => {
      if (slide < 0) return;
      if (slide > maxSlide) return;
      _setSlide(slide);
      emitSlideChange(slide);
    },
    [maxSlide, emitSlideChange]
  );

  useEffect(() => {
    if (!admin || !controlledByRoot) return;
    const slide = localStorage.getItem("slide");
    if (!slide) return;
    setSlide(parseInt(slide));
    const body = {
      slide: parseInt(slide),
      password: localStorage.getItem("adminPassword"),
    };
    socket.emit("slide", JSON.stringify(body));
  }, [admin, setSlide]);

  useEffect(() => {
    socket.emit("getSlide");
    socket.on("slideUpdate", (slide: number) => {
      _setSlide(slide);
    });

    return () => {
      socket.off("slideUpdate");
    };
  }, []);

  return (
    <SlideContext.Provider
      value={{
        slide,
        maxSlide,
        setSlide,
        setMaxSlide,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
}
