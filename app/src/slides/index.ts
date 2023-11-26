import { ReactNode } from "react";
import Home from "./Home";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";

export const slides: (() => ReactNode)[] = [Home, Slide2, Slide3, Slide4];
