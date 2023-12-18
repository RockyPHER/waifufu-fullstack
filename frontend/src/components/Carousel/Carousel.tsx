import Waifu from "../../api/waifus/WaifusApiModel";

interface CarouselProps {
    waifus: Waifu[];
}

export function Carousel({ waifus }: CarouselProps) {

    // const [activeWaifuIdx, setActiveWaifuIdx] = useState(0);

    function next() {

    }
    function previous() {
    }

    return (
        <div className="relative h-screen flex items-center">
            <button className="fixed left-0 bg-gray-300 text-black m-2 p-2" onClick={next}>next</button>
            <button className="fixed right-0 bg-gray-300 text-black m-2 p-2" onClick={previous}>previous</button>
            <div className="flex flex-row w-full h-full">
                {
                    waifus.map((waifu) => (
                        <div key={waifu.id} className="w-full h-full">
                            <div className="bg-cover w-full h-full"
                                style={{ backgroundImage: `url(${waifu.imageUrl})` }} />
                        </div>
                    ))
                }

            </div>
        </div>
    )

}