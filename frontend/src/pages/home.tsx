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

  const [darkMode, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode);
  }
  return (
    <div className="w-full h-full relative bg-white">
      <section
        className="w-full h-full absolute flex justify-start pt-20 items-start bg-cover"
        style={{
          backgroundImage: `url(${backgrounds[Math.floor(Math.random() * 6)]})`,
        }}
      >
        <h1 className="text-8xl font-bold capitalize">waifufu</h1>
        <div className="flex justify-evenly items-center gap-4">
          <button className="w-auto h-auto rounded-full border-2">
            <Plus size={80} className="text-white" />
          </button>
          <button className="w-auto h-auto rounded-full border-2">
            <X size={80} className="text-white" />
          </button>
        </div>
        <button>
          <ChevronDown size={128} className="text-white" />
        </button>
      </section>
      <nav className="w-full h-20 absolute top-0 flex justify-start items-center bg-transparent border-b-2 border-white border-opacity-10 shadow-lg backdrop-blur-sm">
        <MenuButton />
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
