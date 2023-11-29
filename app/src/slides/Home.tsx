import { Link, cn } from "@nextui-org/react";
import { QRCodeSVG } from "qrcode.react";
import MultiSlideElement from "../components/MultiSlideElement";
import { useContext, useEffect, useRef, useState } from "react";
import { SlideContext } from "../contexts/slide/SlideContext";

export default function Home() {
  const { slide } = useContext(SlideContext);
  const [titleSpan, setTitleSpan] = useState("");
  const timeoutsRef = useRef<NodeJS.Timeout[]>();

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (slide <= 0) {
      timeoutsRef.current?.forEach((timeout) => clearTimeout(timeout));
      setTitleSpan("");
      return;
    } else if (slide > 0) {
      const text = "c'est quoi ?";
      if (titleSpan !== "") return;
      //? Typewrite
      const typeWriter = (text: string, i: number) => {
        if (i < text.length) {
          setTitleSpan((prev) => prev + text.charAt(i));
          timeouts.push(setTimeout(() => typeWriter(text, i + 1), 80));
        }
      };
      timeouts.push(setTimeout(() => typeWriter(text, 0), 300));
    }
    timeoutsRef.current = timeouts;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <>
      <MultiSlideElement>
        <h1
          className={cn(
            "text-4xl lg:text-7xl font-bold mb-8 fixed left-[50vw] -translate-x-1/2 top-1/2 -translate-y-1/2 w-max max-w-[90vw]",
            "transition-all duration-300 ease-in-out",
            {
              "top-[15vh] translate-x-0 !left-4 !text-2xl lg:!text-4xl":
                slide > 0,
              "opacity-0 hidden": ![0, 1, 2].includes(slide),
            }
          )}
        >
          Les smart contracts <span className="text-primary">{titleSpan}</span>
        </h1>
      </MultiSlideElement>
      {import.meta.env.VITE_BASE_URL && (
        <div className="absolute left-4 bottom-4">
          <QRCodeSVG
            value={import.meta.env.VITE_BASE_URL}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={true}
          />
          <p className="text-center text-lg">
            Join this presentation at
            <br />
            <Link
              href={import.meta.env.VITE_BASE_URL}
              className="text-xl font-semibold"
            >
              {import.meta.env.VITE_BASE_URL}
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
