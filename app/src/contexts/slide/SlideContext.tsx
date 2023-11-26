import { createContext } from "react";

export type SlideContextType = {
  slide: number;
  maxSlide: number;
  setSlide: (slide: number) => void;
  setMaxSlide: React.Dispatch<React.SetStateAction<number>>;
};

export const SlideContext = createContext<SlideContextType>({
  slide: 0,
  maxSlide: 0,
  setSlide: () => {},
  setMaxSlide: () => {},
});
