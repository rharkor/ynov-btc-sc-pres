import { useContext } from "react";
import { createPortal } from "react-dom";
import { SlideContext } from "../contexts/slide/SlideContext";

export default function MultiSlideElement({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mainRef } = useContext(SlideContext);
  if (!mainRef.current) return;
  return createPortal(children, mainRef.current);
}
