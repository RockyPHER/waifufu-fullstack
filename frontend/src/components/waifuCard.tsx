interface WaifuCardProps {
  backgroundUrl: string;
  heroUrl: string;
}

export default function WaifuCard({ backgroundUrl }: WaifuCardProps) {
  return (
    <div className="size-screen relative">
      {/* <img
        src={heroUrl}
        alt="waifu"
        className="w-[500px] h-auto absolute z-10 bottom-0 right-[10%] object-cover drop-shadow-xl animate-onload-right-3"
      /> */}
      <div
        className="w-screen h-screen relative flex justify-end items-end bg-cover"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* <div className="w-full h-full bg-black bg-opacity-40"></div> */}
      </div>
    </div>
  );
}
