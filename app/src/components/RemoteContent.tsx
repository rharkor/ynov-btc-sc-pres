import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const treshold = 70;

export default function RemoteContent() {
  const { slide, setSlide } = useContext(SlideContext);
  const ref = useRef<HTMLDivElement>(null);

  const [startPoint, setStartPoint] = useState<Touch | null>(null);
  const [endPoint, setEndPoint] = useState<Touch | null>(null);
  const [direction, setDirection] = useState<string | null>(null);

  const onTouch = useCallback(() => {
    if (direction === "left") {
      setSlide(slide + 1);
    } else if (direction === "right") {
      setSlide(slide - 1);
    }
  }, [slide, setSlide, direction]);

  useEffect(() => {
    const handleTouchStart = function (e: TouchEvent) {
      setStartPoint(e.touches[0]);
      setEndPoint(null);
    };
    const handleTouchMove = function (e: TouchEvent) {
      setEndPoint(e.touches[0]);
    };

    const handleTouchEnd = function () {
      onTouch();
      setStartPoint(null);
      setEndPoint(null);
    };

    const target = ref?.current;
    if (!target) return;
    target.addEventListener("touchstart", handleTouchStart);
    target.addEventListener("touchmove", handleTouchMove);
    target.addEventListener("touchend", handleTouchEnd);

    return () => {
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
      target.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref, onTouch]);

  useEffect(() => {
    if (startPoint && endPoint) {
      const diffX = startPoint.clientX - endPoint.clientX;
      const diffY = startPoint.clientY - endPoint.clientY;

      if (Math.abs(diffX) < treshold && Math.abs(diffY) < treshold) return;

      let dir: string;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          dir = "left";
        } else {
          dir = "right";
        }
      } else {
        if (diffY > 0) {
          dir = "top";
        } else {
          dir = "bottom";
        }
      }

      setDirection(dir);
    } else {
      setDirection(null);
    }
  }, [startPoint, endPoint]);

  return (
    <div
      className="h-screen w-screen flex flex-col gap-8 justify-center items-center"
      ref={ref}
    >
      <div className="relative">
        <p className="text-foreground-500 text-sm absolute -top-24 text-center inset-0">
          You can also swipe left or right
        </p>
        <Button
          className="rounded-full p-6 w-max h-max text-foreground-600 border"
          onClick={() => setSlide(slide + 1)}
        >
          <ChevronRight className="w-[60vw] !max-w-[400px] h-auto" />
        </Button>
      </div>
      <Button
        className="rounded-full p-2 min-w-[unset] w-max h-max text-foreground-600 border"
        onClick={() => setSlide(slide - 1)}
      >
        <ChevronLeft className="w-[10vw] !max-w-[80px] h-auto" />
      </Button>
    </div>
  );
}
