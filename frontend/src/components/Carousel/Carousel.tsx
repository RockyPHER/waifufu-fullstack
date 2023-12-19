import Waifu from "../../api/waifus/WaifusApiModel";

interface CarouselProps {
    waifus: Waifu[];
}

interface WaifuProfileProps {
    waifu: Waifu;
}

export function Carousel({ waifus }: CarouselProps) {

    const [currentPage, setCurrentPage] = useState(0);

    function next() {
    }
    function previous() {
    }

    return (
        <div className="h-screen flex items-center">
            <button className="fixed left-0 bg-gray-300 text-black m-2 p-2" onClick={next}>next</button>
            <button className="fixed right-0 bg-gray-300 text-black m-2 p-2" onClick={previous}>previous</button>
            <div className="absolute left-[] flex flex-row w-fit h-full">
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
            <div className="bg-gradient-to-r from-gray-800 to-transparent w-1/2 h-1/3">

            </div>
        </div>
    )
}