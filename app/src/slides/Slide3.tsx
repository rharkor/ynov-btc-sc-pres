import { Image } from "@nextui-org/react";
import { SlideContext } from "../contexts/slide/SlideContext";
import { useContext, useState } from "react";

export default function Slide3() {
  const { slide: curSlide } = useContext(SlideContext);
  const [showImage, setShowImage] = useState(false);

  if (!showImage && Math.abs(curSlide - (3 - 1)) < 2) setShowImage(true);

  return (
    <>
      <h2>Slide 3</h2>
      {showImage && (
        <Image src="https://picsum.photos/200" width="200px" height="200px" />
      )}
      <p>
        In order to optimize your slides you can lazy load your images manually
      </p>
    </>
  );
}
