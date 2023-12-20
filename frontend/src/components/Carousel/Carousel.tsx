import { useState } from "react";
import Waifu from "../../api/waifus/WaifusApiModel";

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
            <button className="fixed z-10 left-0 bg-gray-300 text-black m-2 p-2" onClick={previous}>previous</button>
            <button className="fixed z-10 right-0 bg-gray-300 text-black m-2 p-2" onClick={next}>next</button>
            <div className="absolute transition-transform duration-300 ease-in-out left-0 flex flex-row w-fit h-full"
                style={{ transform: `translateX(-${currentWaifuIdx * 100}vw)` }}>
                {
                    waifus.map((waifu) => (
                        <WaifuProfile waifu={waifu} />
                    ))
                }
            </div>
        </div>
    )

}

export function WaifuProfile({ waifu }: WaifuProfileProps) {

    return (
        <div className="w-screen h-screen bg-cover" key={waifu.id} style={{ backgroundImage: `url(${waifu.imageUrl})` }}>
            <div className="absolute p-10 bottom-0 translate-y-[-35%] bg-gradient-to-r from-black to-transparent w-[50vw] h-[40vh]">
                <h1 className="text-4xl text-white font-bold">{waifu.name}</h1>
                <p className="text-white">{waifu.age}</p>
                <p className="text-white">{waifu.height}</p>
                <p className="text-white">{waifu.weight}</p>
                <p className="text-white">{waifu.bio}</p>
            </div>
        </div>
    )
}