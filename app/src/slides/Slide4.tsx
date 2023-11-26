import { useContext, useState } from "react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { cn } from "@nextui-org/react";

export default function Slide4() {
  const { slide: curSlide } = useContext(SlideContext);

  const [hasStarted, setHasStarted] = useState(false);
  if (!hasStarted && curSlide === 4 - 1) setHasStarted(true);

  return (
    <>
      <h2>Slide 4</h2>
      <div
        className={cn(
          "animate-[appearance-out_5s_ease-in-out_forwards] h-[50px] w-[50px] bg-red-400 rounded-full",
          { "!animate-none": !hasStarted }
        )}
      ></div>
      <p>Control your animations with the slide hook</p>
    </>
  );
}
