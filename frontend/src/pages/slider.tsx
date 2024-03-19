// import { useQuery } from "@tanstack/react-query";
// import { Slider } from "../components/slider";
// import { AxiosError, AxiosResponse } from "axios";
// import Waifu from "../api/waifus/model";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Home,
  Plus,
  Trash,
} from "lucide-react";
import WaifuInfo from "../components/waifuInfo";
import { deleteWaifus, getWaifus } from "../api/waifus/fetch";
import WaifuCard from "../components/waifuCard";
import { MouseParallax } from "react-just-parallax";
import { WaifuData } from "../api/waifus/model";
import Backdrop from "../components/backdrop";
import WaifuForm from "../components/waifuForm";

interface SliderProps {
  onChange: boolean[];
  setOnChange: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export function Slider({ onChange, setOnChange }: SliderProps) {
  //   const MyQuery = useQuery<AxiosResponse<Waifu[]>, AxiosError>({
  //     queryKey: ["waifus"],
  //     queryFn: getWaifus,
  //   });
  //   const waifusData = MyQuery.data?.data;
  // ******** COMMENTED FOR DEPLOYMENT ********

  const [waifuData, setWaifuData] = useState<WaifuData[]>(getWaifus());
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = waifuData?.length || 1;
  const [openForm, setOpenForm] = useState(false);

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

  function handleOpenHome() {
    onChangeHandler();
    setOnChange([true, false]);
  }

  function handleDelete() {
    const id = waifuData[currentIndex].id;
    const newWaifus = waifuData.filter((waifu) => waifu.id !== id);
    deleteWaifus([id]);
    setWaifuData(newWaifus);
    setCurrentIndex((prev: number) =>
      prev === 0 ? 0 : (prev - 1) % totalPages
    );
  }

  function handleAdd() {
    setOpenForm(true);
  }

  function onChangeHandler() {
    if (onChange[1] === true) {
      return styleOnChange;
    } else if (onChange[0] === true) {
      return styleOnLoad;
    }
  }
  const styleOnChange = {
    zIndex: 2,
    animation: "slideIn 0.5s ease-in-out",
  };
  const styleOnLoad = {
    zIndex: 0,
  };
  return (
    <div
      className="w-full h-full absolute overflow-hidden flex items-center "
      style={onChangeHandler()}
    >
      {openForm && (
        <Backdrop
          isOpen={openForm}
          children={<WaifuForm editMode={false} setIsOpen={setOpenForm} />}
        />
      )}
      <div className="radial-gradient" />
      {/* edit buttons */}
      <div className="w-auto h-[80px] absolute z-30 bottom-10 right-20 flex gap-2">
        <button
          onClick={handleAdd}
          className="w-16 h-16 flex justify-center items-center border-2 rounded-full bg-white bg-opacity-0 hover:scale-110 hover:bg-opacity-50 active:scale-100 active:bg-opacity-80 transition-all"
        >
          <Plus className="w-14 h-14 text-white" />
        </button>
        <button
          onClick={handleDelete}
          className="w-16 h-16 flex justify-center items-center border-2 rounded-full bg-white bg-opacity-0 hover:scale-110 hover:bg-opacity-50 active:scale-100 active:bg-opacity-80 transition-all"
        >
          <Trash className="w-10 h-10 text-white" />
        </button>
        <button
          onClick={handleOpenHome}
          className="w-16 h-16 flex justify-center items-center border-2 rounded-full bg-white bg-opacity-0 hover:scale-110 hover:bg-opacity-50 active:scale-100 active:bg-opacity-80 transition-all"
        >
          <Home className="w-10 h-10 z-30 text-white" />
        </button>
      </div>
      {/* navigation buttons */}
      <div className="w-[80px] h-full absolute right-0 z-30 group">
        <button
          onClick={handleNext}
          className="w-auto h-full absolute z-30 py-2 top-0 right-0 translate-x-24 group-hover:translate-x-0 transition-all flex justify-center items-center"
        >
          <div className="w-full h-full absolute z-30 px-12 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronRight className="w-20 h-20 text-white z-40 group-hover:animate-bounce-right group-active:scale-90 group-active:animate-none" />
        </button>
      </div>
      <div className="w-[80px] h-full absolute left-0 z-30 group">
        <button
          onClick={handlePrevious}
          className="w-auto h-full absolute z-30 py-2 top-0 left-0 -translate-x-24 group-hover:translate-x-0 transition-all flex justify-center items-center"
        >
          <div className="w-full h-full absolute z-30 px-12 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-80" />
          <ChevronLeft className="w-20 h-20 text-white z-40 group-hover:animate-bounce-left group-active:scale-90 group-active:animate-none" />
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
      <div className="w-auto h-auto z-20 absolute left-1/2 translate-x-[-50%] bottom-6 flex gap-5 items-center justify-center bg-black  bg-opacity-30 rounded-full">
        {new Array(totalPages).fill(0).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className=""
          >
            <Circle
              fill={currentIndex === index ? "white" : "transparent"}
              style={{
                stroke: "white",
                strokeWidth: 2,
                transition: "all 0.3s ease-in-out",
                transform: currentIndex === index ? "scale(1.5)" : "scale(1)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
