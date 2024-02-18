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
    <div className="w-1/2 h-[400px] bg-black bg-opacity-30">
      <span>
        <h1>{waifu.name}</h1>
        <p>
          <Hourglass />
          {waifu.age} years
        </p>
        <p>
          <Globe2 />
          {waifu.origin}
        </p>
        <p>
          <Palette />
          {waifu.hairColor}
        </p>
        <p>
          <Eye />
          {waifu.eyeColor}
        </p>
        <p>
          <Ruler />
          {waifu.height}cm
        </p>
        <p>
          <Weight />
          {waifu.weight}kg
        </p>
        <p>
          <CalendarFold />
          {waifu.birthday}
        </p>
      </span>
    </div>
  );
}
