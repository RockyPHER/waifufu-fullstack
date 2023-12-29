import { useEffect, useState } from "react";
import Waifu from "../../api/waifus/WaifusApiModel";
import RightIcon from "@/assets/right.svg?react"
import LeftIcon from "@/assets/left.svg?react"

interface CarouselProps {
    waifus: Waifu[];
}

interface WaifuProfileProps {
    waifu: Waifu;
    handleWaifuMap: (info : Waifu) => void;
}

export function Carousel({ waifus }: CarouselProps) {

    let waifuReInfo: Waifu;
    const [currentWaifuIdx, setCurrentWaifuIdx] = useState(0);
    let waifuInitialValue = waifus[currentWaifuIdx];
    const [waifuInfo, setWaifuInfo] = useState<Waifu>(waifuInitialValue);

    function next() {
        setCurrentWaifuIdx((prev: number) => (prev + 1) % waifus.length)
    }
    function previous() {
        setCurrentWaifuIdx((prev: number) => (prev - 1 + waifus.length) % waifus.length)
    }

    function handleWaifuMap(info: Waifu) {
        
        setWaifuInfo(info)
        waifuReInfo = info

    }

    useEffect(() => setWaifuInfo(waifuReInfo), [waifuInfo]);

    return (
        <div className="h-screen flex items-center">
            <button className="fixed overflow-hidden z-10 left-0 text-black m-2 p-2" onClick={previous}>
                <LeftIcon className="w-14 h-14" />
            </button>
            <button className="fixed z-10 right-0 text-black m-2 p-2" onClick={next}>
                <RightIcon className="w-14 h-14" />
            </button>
            <div className="absolute transition-transform duration-300 ease-in-out left-0 flex flex-row w-fit h-full"
                style={{ transform: `translateX(-${currentWaifuIdx * 100}vw)` }}>
                {
                    waifus.map((waifu) => (
                        <WaifuProfile key={waifu.id} waifu={waifu} handleWaifuMap={handleWaifuMap} />
                    ))
                }
            </div>
            <div>
                <h1 className="text-4xl text-white font-bold">{waifuInfo.name}</h1>
                <p className="text-white">{waifuInfo.age}</p>
                <div>
                    <p className="text-white">{waifuInfo.height}</p>
                    <p className="text-white">{waifuInfo.weight}</p>
                </div>
                <div>
                    <p>{waifuInfo.eyeColor}</p>
                    <p>{waifuInfo.hairColor}</p>
                </div>
                <p className="text-white">{waifuInfo.birthday}</p>
                <p className="text-white">{waifuInfo.origin}</p>
            </div>
        </div>
    )

}

export function WaifuProfile({ waifu, handleWaifuMap }: WaifuProfileProps) {

    handleWaifuMap(waifu);

    return (
        <div className="w-screen h-screen bg-cover" style={{ backgroundImage: `url(${waifu.imageUrl})` }}/>
    )
}