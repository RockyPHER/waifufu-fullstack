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

interface WaifuInfoProps {
  waifu: Waifu;
}

export default function WaifuInfo({ waifu }: WaifuInfoProps) {
  return (
    <div className="w-1/2 h-auto absolute top-1/2 translate-y-[-20%] z-20 left-0 select-none bg-opacity-30">
      <div className="w-full h-full absolute top-0 left-0 -z-10 animate-onload-left bg-gradient-to-r from-black to-transparent"></div>
      <span className="flex flex-col gap-1 px-10 py-4">
        <h1 className="mb-4 font-bold text-4xl animate-onload-left">
          {waifu.name}
        </h1>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Hourglass />
          {waifu.age} years
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Globe2 />
          {waifu.origin}
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Palette />
          {waifu.hairColor}
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Eye />
          {waifu.eyeColor}
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Ruler />
          {waifu.height}cm
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <Weight />
          {waifu.weight}kg
        </p>
        <p className="flex items-center text-lg font-semibold gap-3 animate-onload-left">
          <CalendarFold />
          {waifu.birthday}
        </p>
      </span>
    </div>
  );
}
