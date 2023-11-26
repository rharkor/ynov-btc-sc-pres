import { ChevronLeft, ChevronRight, Fullscreen, Minimize } from "lucide-react";
import { Button, cn } from "@nextui-org/react";
import AdminLogin from "./AdminLogin";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../contexts/root/RootContext";
import { SlideContext } from "../contexts/slide/SlideContext";
import { slides } from "../slides";
import { RemoteContext } from "../contexts/remote/RemoteContext";
import { controlledByRoot } from "../config";
import { FullScreenContext } from "../contexts/fullscreen/FullScreenContext";

export default function Footer() {
  const { slide, setSlide } = useContext(SlideContext);
  const { admin } = useContext(RootContext);
  const { isRemote } = useContext(RemoteContext);
  const { isFullScreen, toggleIsFullScreen } = useContext(FullScreenContext);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  return (
    <>
      <div className="absolute right-3 bottom-3 flex flex-col gap-4 items-end">
        {!isFullScreen && (
          <div className="flex flex-row gap-4">
            {(!controlledByRoot || admin) && !isRemote && (
              <div className="flex flex-row gap-4">
                <ChevronLeft
                  className={cn(
                    "text-foreground-500 w-10 h-10 cursor-pointer",
                    {
                      "opacity-50": slide === 0,
                    }
                  )}
                  onClick={() => setSlide(slide - 1)}
                />
                <ChevronRight
                  className={cn(
                    "text-foreground-500 w-10 h-10 cursor-pointer",
                    {
                      "opacity-50": slide === slides.length - 1,
                    }
                  )}
                  onClick={() => setSlide(slide + 1)}
                />
              </div>
            )}
            <Button
              color="primary"
              className="min-w-[unset] p-3 h-[unset]"
              onPress={toggleIsFullScreen}
            >
              <Fullscreen className="w-6 h-6" />
            </Button>
          </div>
        )}
        {isFullScreen && isTouchDevice && (
          <Button
            color="primary"
            className="min-w-[unset] p-2 h-[unset]"
            onPress={toggleIsFullScreen}
          >
            <Minimize className="w-4 h-4" />
          </Button>
        )}
        <div className="flex flex-row gap-4 items-end">
          <div className="text-2xl text-foreground-400 font-extrabold">
            {slides.length ? slide + 1 : 0}/{slides.length}
          </div>
          {!isFullScreen && <AdminLogin />}
        </div>
      </div>
      {!isFullScreen && (
        <div className="fixed left-3 top-3 text-foreground-400 text-sm font-extrabold hover:text-primary-400">
          <a
            href="https://github.com/rharkor/react-presentation"
            target="_blank"
            rel="noreferrer"
          >
            Created with React Presentation
          </a>
        </div>
      )}
    </>
  );
}
