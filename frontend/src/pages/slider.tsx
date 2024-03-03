// import { useQuery } from "@tanstack/react-query";
// import { Slider } from "../components/slider";
// import { AxiosError, AxiosResponse } from "axios";
// import Waifu from "../api/waifus/model";
// import { getWaifus } from "../api/waifus/fetch";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import WaifuInfo from "../components/waifuInfo";
import { useQuery } from "@tanstack/react-query";
import { getWaifus } from "../api/waifus/fetch";
import WaifuCard from "../components/waifuCard";
import { MouseParallax } from "react-just-parallax";

export function Slider() {
  //   const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
  //     queryKey: ["waifus"],
  //     queryFn: getWaifus,
  //   });
  //   const waifusData = MyQuery.data?.data;
  // ******** COMMENTED FOR DEPLOYMENT ********

  const { data } = useQuery({ queryKey: [Object], queryFn: getWaifus });
  const waifuData = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = waifuData?.length || 1;

  console.log(data);
  function next() {
    setCurrentIndex((prev: number) => (prev + 1) % totalPages);
  }
  function previous() {
    setCurrentIndex((prev: number) => (prev - 1 + totalPages) % totalPages);
  }

  function handleNext() {
    next();
  }
  function handlePrevious() {
    previous();
  }

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center">
      {/* navigation buttons */}
      <div className="w-[80px] h-full absolute right-0 z-30 group">
        <button
          onClick={handleNext}
          className="w-auto h-full absolute z-30 py-2 top-0 right-0 translate-x-24 group-hover:translate-x-0 transition-all flex justify-start items-center"
        >
          <div className="w-full h-full absolute z-30 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronRight className="w-16 h-16 text-white z-40 group-hover:animate-bounce-right" />
        </button>
      </div>
      <div className="w-[80px] h-full absolute left-0 z-30 group">
        <button
          onClick={handlePrevious}
          className="w-auto h-full absolute z-30 py-2 top-0 left-0 -translate-x-24 group-hover:translate-x-0 transition-all flex justify-start items-center"
        >
          <div className="w-full h-full absolute z-30 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronLeft className="w-16 h-16 text-white z-40 group-hover:animate-bounce-left" />
        </button>
      </div>
      {/* information container */}
      {waifuData && <WaifuInfo waifu={waifuData[currentIndex]} />}

      {/* slides container */}
      <div className="w-full h-full overflow-hidden absolute top-0 left-0">
        <MouseParallax lerpEase={0.1} strength={0.02} shouldResetPosition>
          <div
            className="w-auto h-full absolute left-0 flex transition-all duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
          >
            {waifuData &&
              waifuData.map((waifu, idx) => <WaifuCard key={idx} {...waifu} />)}
          </div>
        </MouseParallax>
      </div>

      {/* pagination buttons */}
      <div className="w-auto h-auto absolute left-1/2 translate-x-[-50%] bottom-6 flex gap-5 items-center justify-center">
        {new Array(totalPages).fill(0).map((_, index) => (
          <button onClick={() => setCurrentIndex(index)} className="">
            <Circle
              fill={currentIndex === index ? "#fff" : "transparent"}
              key={index}
              className="text-white opacity-80 w-4 h-4"
            />
          </button>
        ))}
      </div>
    </div>
  );
}