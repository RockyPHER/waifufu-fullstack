import {
  CalendarFold,
  Eye,
  Globe2,
  Hourglass,
  Palette,
  Ruler,
  Weight,
} from "lucide-react";
import { WaifuData } from "../api/waifus/model";
import { animated, useSprings } from "@react-spring/web";
import { useEffect } from "react";

interface WaifuInfoProps {
  waifu: WaifuData;
}

export default function WaifuInfo({ waifu }: WaifuInfoProps) {
  const keyid = waifu.id;
  const calculateDelay = (index: number) => {
    return index * 10; // Adjust the delay as needed
  };

  const categories = [
    "age",
    "origin",
    "hairColor",
    "eyeColor",
    "height",
    "weight",
    "birthday",
  ];

  const animationConfig = () =>
    Array.from({ length: 9 }, (_, index) => ({
      from: {
        x: -300,
        opacity: 0,
      },
      to: {
        x: 0,
        opacity: 1,
      },
      delay: calculateDelay(index),
    }));

  const springProps = useSprings(
    9,
    animationConfig().map((config) => ({ ...config }))
  );
  useEffect(() => {
    springProps.map(
      (spring, index) => {
        spring.x.start({
          from: -300,
          to: 0,
          delay: calculateDelay(index),
        });
        spring.opacity.start({
          from: 0,
          to: 1,
        });
      },
      [keyid]
    );
  });

  function convertBirthday(birthday: string | undefined) {
    if (birthday) {
      if (birthday === "unknown_--") {
        return "unknown";
      }
      const [month, day] = birthday.split("_");
      return `${month} ${day}`;
    }
  }

  return (
    <div className="w-1/2 h-auto absolute top-1/2 translate-y-[-20%] z-20 left-0 select-none bg-opacity-30">
      <animated.div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
          ...springProps[0],
        }}
        className="w-full h-full absolute top-0 left-0 -z-10"
      ></animated.div>
      <span className={`flex flex-col gap-1 px-10 py-4`}>
        <animated.h1
          className={`mb-4 font-bold text-4xl`}
          style={springProps[1]}
        >
          {waifu.name}
        </animated.h1>
        {categories.map((category, index) => (
          <animated.p
            key={index}
            style={springProps[index + 2]}
            className={`flex gap-2 items-center text-white text-lg`}
          >
            {getIcon(category)}
            {category === "origin" ? (
              <a href={waifu.originUrl}>{waifu[category]}</a>
            ) : category === "birthday" ? (
              convertBirthday(waifu[category])
            ) : (
              waifu[category]
            )}
            {getMeasurementUnit(category)}
          </animated.p>
        ))}
      </span>
    </div>
  );
}

function getMeasurementUnit(data: string) {
  if (data === "age") {
    return "years";
  } else if (data === "weight") {
    return "kg";
  } else if (data === "height") {
    return "cm";
  }
  return "";
}
function getIcon(data: string) {
  switch (data) {
    case "age":
      return <Hourglass />;
    case "origin":
      return <Globe2 />;
    case "hairColor":
      return <Palette />;
    case "eyeColor":
      return <Eye />;
    case "height":
      return <Ruler />;
    case "weight":
      return <Weight />;
    case "birthday":
      return <CalendarFold />;
    default:
      return "none";
  }
}
