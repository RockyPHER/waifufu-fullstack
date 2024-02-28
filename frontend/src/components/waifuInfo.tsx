import {
  CalendarFold,
  Eye,
  Globe2,
  Hourglass,
  Palette,
  Ruler,
  Weight,
} from "lucide-react";
import Waifu from "../api/waifus/model";
import { useEffect, useState, useTransition } from "react";

interface WaifuInfoProps {
  waifu: Waifu;
}

export default function WaifuInfo({ waifu }: WaifuInfoProps) {
  const keyid = waifu.id;
  const [isVisible, setIsVisible] = useState(false);
  const calculateDelay = (index: number) => {
    return `${index * 50}ms`; // Adjust the delay as needed
  };

  const transition = useTransition(isVisible, {
    from: {},
    enter: {},
    leave: {},
  });

  return (
    <div className="w-1/2 h-auto absolute top-1/2 translate-y-[-20%] z-20 left-0 select-none bg-opacity-30">
      <div className="w-full h-full absolute top-0 left-0 -z-10 animate-onload-left-8 bg-gradient-to-r from-black to-transparent"></div>
      <span key={keyid} className={`flex flex-col gap-1 px-10 py-4`}>
        <h1
          className={`mb-4 font-bold text-4xl animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(1) }}
        >
          {waifu.name}
        </h1>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(2) }}
        >
          <Hourglass />
          {waifu.age} years
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(3) }}
        >
          <Globe2 />
          {waifu.origin}
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(4) }}
        >
          <Palette />
          {waifu.hairColor}
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(5) }}
        >
          <Eye />
          {waifu.eyeColor}
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(6) }}
        >
          <Ruler />
          {waifu.height}cm
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(7) }}
        >
          <Weight />
          {waifu.weight}kg
        </p>
        <p
          className={`flex items-center text-lg font-semibold gap-3 animate-onload-left-3`}
          style={{ animationDelay: calculateDelay(8) }}
        >
          <CalendarFold />
          {waifu.birthday}
        </p>
      </span>
    </div>
  );
}
