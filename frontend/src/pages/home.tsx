import MenuButton from "../components/menuButton";

export default function Home() {
  const backgrounds = [
    "https://images2.alphacoders.com/133/1330236.png",
    "https://images5.alphacoders.com/133/1338079.png",
    "https://images7.alphacoders.com/133/1333741.png",
    "https://images.alphacoders.com/133/1339164.png",
    "https://images5.alphacoders.com/134/1344988.jpeg",
    "https://images3.alphacoders.com/133/1339873.png",
  ];
  return (
    <div className="w-full h-full relative bg-white">
      <div
        className="w-full h-full absolute bg-cover"
        style={{
          backgroundImage: `url(${backgrounds[Math.floor(Math.random() * 6)]})`,
        }}
      />
      <nav className="w-full h-20 absolute top-0 flex justify-start items-center bg-transparent border-b-2 border-white border-opacity-10 shadow-lg backdrop-blur-sm">
        <MenuButton />
      </nav>
      <section className="w-full h-full flex justify-center items-center">
        <h1 className="text-5xl text-white">Waifufu</h1>
      </section>
    </div>
  );
}
