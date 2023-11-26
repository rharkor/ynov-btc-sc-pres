import { useContext, useEffect } from "react";
import { RootContext } from "../contexts/root/RootContext";
import { SlideContext } from "../contexts/slide/SlideContext";
import { slides } from "../slides";
import { controlledByRoot } from "../config";
import { cn } from "@nextui-org/react";

export default function Slides() {
  const { slide, setSlide, setMaxSlide } = useContext(SlideContext);
  const { admin } = useContext(RootContext);

  useEffect(() => {
    if (!admin && controlledByRoot) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        setSlide(slide + 1);
      }

      if (e.key === "ArrowLeft") {
        setSlide(slide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slide, setSlide, admin]);

  useEffect(() => {
    setMaxSlide(slides.length - 1);
  }, [setMaxSlide]);

  return (
    <section
      className="flex flex-row h-screen w-max transition-all duration-300"
      style={{
        transform: `translateX(-${slide * 100}vw)`,
      }}
      role="presentation"
    >
      {slides.map((slideComponent, i) => (
        <section
          className={cn(
            "flex flex-col gap-2 justify-center items-center h-screen w-screen p-4",
            {
              invisbile: Math.abs(i - slide) >= 1,
            }
          )}
          key={i}
        >
          {slideComponent()}
        </section>
      ))}
    </section>
  );
}
