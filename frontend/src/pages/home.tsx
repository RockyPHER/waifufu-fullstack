import { ChevronDown, Moon, Plus, Sun, X } from "lucide-react";
import MenuButton from "../components/menuButton";
import { useState } from "react";

export default function Home() {
  const backgrounds = [
    "https://images2.alphacoders.com/133/1330236.png",
    "https://images5.alphacoders.com/133/1338079.png",
    "https://images7.alphacoders.com/133/1333741.png",
    "https://images.alphacoders.com/133/1339164.png",
    "https://images5.alphacoders.com/134/1344988.jpeg",
    "https://images3.alphacoders.com/133/1339873.png",
  ];

  const buttonConfigs = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
    size: 10,
  };
  const [darkMode, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode);
  }
  return (
    <div className="w-full h-full relative bg-white">
      <section
        className="w-full h-full absolute flex justify-start pt-20 items-start bg-cover"
        style={{
          backgroundImage: `url(${backgrounds[4]})`,
        }}
      >
        <button className="w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center group">
          <ChevronDown
            size={128}
            className="group-hover:animate-bounce transition-all text-white"
          />
        </button>
      </section>
      <nav className="w-full h-20 absolute top-0 flex justify-evenly items-center bg-transparent border-b-2 border-white border-opacity-10 shadow-lg backdrop-blur-sm">
        <MenuButton {...buttonConfigs} />
        <h1 className="select-none text-5xl font-bold capitalize animate-onload-up">
          waifufu
        </h1>
        <button
          className="w-[64px] h-[32px] relative bg-white bg-opacity-20 rounded-full"
          onClick={() => handleClick()}
        >
          <div
            className="absolute -top-[2px] right-0 flex items-center rounded-full border-2 border-white border-opacity-50 transition-all"
            style={{ transform: `translateX(${darkMode ? -32 : 0}px)` }}
          >
            {darkMode ? (
              <Moon size={32} className="text-white" />
            ) : (
              <Sun size={32} className="text-white" />
            )}
          </div>
        </button>
      </nav>
    </div>
  );
}
