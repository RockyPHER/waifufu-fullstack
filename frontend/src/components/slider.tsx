import { useState } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import WaifuInfo from "./waifuInfo";
import Waifu from "../api/waifus/model";
import WaifuCard from "./waifuCard";

interface SliderProps {
  waifuData?: Waifu[];
}

export function Slider({ waifuData }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = waifuData?.length || 1;

  function next() {
    setCurrentIndex((prev: number) => (prev + 1) % totalPages);
  }
  function previous() {
    setCurrentIndex((prev: number) => (prev - 1 + totalPages) % totalPages);
  }

  return (
    <div className="h-screen flex items-center">
      {/* navigation buttons */}
      <div className="w-[150px] h-full absolute right-0 z-20 group">
        <button
          onClick={next}
          className="w-auto h-full absolute z-10 py-2 top-0 right-0 translate-x-24 group-hover:translate-x-0 transition-all flex justify-start items-center"
        >
          <div className="w-full h-full absolute z-10 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronRight className="w-32 h-32 text-white z-10 group-hover:animate-bounce-right" />
        </button>
      </div>
      <div className="w-[150px] h-full absolute left-0 z-20 group">
        <button
          onClick={previous}
          className="w-auto h-full absolute z-10 py-2 top-0 left-0 -translate-x-24 group-hover:translate-x-0 transition-all flex justify-start items-center"
        >
          <div className="w-full h-full absolute z-10 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronLeft className="w-32 h-32 text-white z-10 group-hover:animate-bounce-left" />
        </button>
      </div>
      {/* information container */}
      {waifuData && <WaifuInfo waifu={waifuData[currentIndex]} />}

      {/* slides container */}
      <div
        className="w-auto h-full absolute left-0 flex transition-all duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {waifuData &&
          waifuData.map((waifu) => <WaifuCard key={waifu.id} {...waifu} />)}
      </div>

      {/* pagination buttons */}
      <div className="w-auto h-auto absolute bottom-0">
        {new Array(totalPages).fill(0).map((_, index) => (
          <Circle
            fill={currentIndex === index ? "white" : "black"}
            key={index}
            className="w-6 h-6"
          />
        ))}
      </div>
    </div>
  );
}
