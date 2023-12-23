import { useState } from "react";
import Waifu from "../../api/waifus/WaifusApiModel";
import RightIcon from "@/assets/right.svg?react"
import LeftIcon from "@/assets/left.svg?react"

interface CarouselProps {
    waifus: Waifu[];
}

interface WaifuProfileProps {
    waifu: Waifu;
}

export function Carousel({ waifus }: CarouselProps) {

    const [currentWaifuIdx, setCurrentWaifuIdx] = useState(0);

    function next() {
        setCurrentWaifuIdx((prev: number) => (prev + 1) % waifus.length)
    }
    function previous() {
        setCurrentWaifuIdx((prev: number) => (prev - 1 + waifus.length) % waifus.length)
    }

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
                        <WaifuProfile key={waifu.id} waifu={waifu} />
                    ))
                }
            </div>
        </div>
    )

}

export function WaifuProfile({ waifu }: WaifuProfileProps) {

    return (
        <div className="w-screen h-screen bg-cover" style={{ backgroundImage: `url(${waifu.imageUrl})` }}>
            <div className="absolute p-10 bottom-0 translate-y-[-10%] bg-gradient-to-r from-black to-transparent w-[50vw] h-[45vh]">
                <h1 className="text-4xl text-white font-bold">{waifu.name}</h1>
                <p className="text-white">{waifu.age}</p>
                <div>
                    <p className="text-white">{waifu.height}</p>
                    <p className="text-white">{waifu.weight}</p>
                </div>
                <div>
                    <p>{waifu.eyeColor}</p>
                    <p>{waifu.hairColor}</p>
                </div>
                <p className="text-white">{waifu.birthday}</p>
                <p className="text-white">{waifu.origin}</p>
            </div>
        </div>
    )
}