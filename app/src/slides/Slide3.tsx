import { useContext, useState } from "react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { Image, Link } from "@nextui-org/react";
import codeExample from "../assets/code-example.png";
import { ArrowRight } from "lucide-react";
import ethereumLogo from "../assets/ethereum-eth-logo.svg";

export default function Slide3() {
  const { slide } = useContext(SlideContext);
  const [showImage, setShowImage] = useState(false);

  if (!showImage && Math.abs(slide - (3 - 1)) < 2) setShowImage(true);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-center mt-36 lg:mt-0 overflow-auto max-h-[60vh]">
        <div className="flex flex-col gap-2 items-center">
          {showImage && (
            <Image src={codeExample} className="w-[300px] object-contain" />
          )}
          <p className="text-center text-lg font-semibold">Code</p>
        </div>
        <ArrowRight className="w-12 h-12 rotate-90 lg:rotate-0 text-primary shrink-0" />
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={ethereumLogo}
            className="w-[200px] h-[200px] object-contain"
          />
          <p className="text-center text-lg font-semibold">Blockchain</p>
        </div>
      </div>
      <Link
        href="https://mumbai.polygonscan.com/address/0x4E36999dc3d5fdA9807EDC2F48BA6E705bE554E9"
        className="mt-12"
        target="_blank"
      >
        Exemple
      </Link>
    </>
  );
}
