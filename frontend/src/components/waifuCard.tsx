interface WaifuCardProps {
  backgroundUrl: string;
  heroUrl: string;
}

export default function WaifuCard({ backgroundUrl, heroUrl }: WaifuCardProps) {
  return (
    <div
      className="w-screen h-screen flex justify-end items-end bg-cover"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <img src={heroUrl} alt="waifu" className="w-auto h-auto object-cover" />
    </div>
  );
}
