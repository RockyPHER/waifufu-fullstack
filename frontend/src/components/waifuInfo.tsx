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
import {
  animated,
  useSpring,
  useSpringValue,
  useSprings,
} from "@react-spring/web";
import { useEffect } from "react";

interface WaifuInfoProps {
  waifu: Waifu;
}

export default function WaifuInfo({ waifu }: WaifuInfoProps) {
  const keyid = waifu.id;
  const calculateDelay = (index: number) => {
    return index * 10; // Adjust the delay as needed
  };

  const [props0, api0] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props1, api1] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props2, api2] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props3, api3] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props4, api4] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props5, api5] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props6, api6] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props7, api7] = useSpring(() => ({
    from: { x: -200, opacity: 0 },
    to: { x: 0, opacity: 1 },
  }));
  const [props8, api8] = useSpring(() => ({}));

  useEffect(() => {
    api1.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 0,
    });
    api2.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 10,
    });
    api3.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 20,
    });
    api4.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 30,
    });
    api5.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 40,
    });
    api6.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 50,
    });
    api7.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 60,
    });
    api8.start({
      from: { x: -200, opacity: 0 },
      to: { x: 0, opacity: 1 },
      delay: 70,
    });
    api0.start({
      from: { x: -100, opacity: 0 },
      to: { x: 0, opacity: 1 },
    });
  });

  return (
    <div className="w-1/2 h-auto absolute top-1/2 translate-y-[-20%] z-20 left-0 select-none bg-opacity-30">
      <animated.div
        style={props0}
        className="w-full h-full absolute top-0 left-0 -z-10 animate-onload-left-8 bg-gradient-to-r from-black to-transparent"
      ></animated.div>
      <span className={`flex flex-col gap-1 px-10 py-4`}>
        <animated.h1 className={`mb-4 font-bold text-4xl`} style={props1}>
          {waifu.name}
        </animated.h1>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props2}
        >
          <Hourglass />
          {waifu.age} years
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props3}
        >
          <Globe2 />
          {waifu.origin}
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props4}
        >
          <Palette />
          {waifu.hairColor}
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props5}
        >
          <Eye />
          {waifu.eyeColor}
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props6}
        >
          <Ruler />
          {waifu.height}cm
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props7}
        >
          <Weight />
          {waifu.weight}kg
        </animated.p>
        <animated.p
          className={`flex items-center text-lg font-semibold gap-3`}
          style={props8}
        >
          <CalendarFold />
          {waifu.birthday}
        </animated.p>
      </span>
    </div>
  );
}
