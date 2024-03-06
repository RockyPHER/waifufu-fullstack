import { ChevronDown, Moon, Sun } from "lucide-react";
import MenuButton from "../components/menuButton";
import { useState } from "react";

export default function Home() {
  const colorTheme = {
    darkMain: "rgba(0, 0, 0, 1)",
    darkMid: "rgba(0, 0, 0, 0.5)",
    darkBack: "rgba(0, 0, 0, 0.1)",
    lightMain: "rgba(255, 255, 255, 1)",
    lightMid: "rgba(255, 255, 255, 0.3)",
    lightBack: "rgba(255, 255, 255, 0.1)",
  };
  const [darkMode, setDarkMode] = useState(false);
  const [mainColor, setMainColor] = useState(colorTheme.lightMain);
  const [midColor, setMidColor] = useState(colorTheme.lightMid);
  const [backColor, setBackColor] = useState(colorTheme.lightBack);

  const handleThemeChange = (bool: boolean) => {
    if (bool === true) {
      setMainColor(colorTheme.darkMain);
      setMidColor(colorTheme.darkMid);
      setBackColor(colorTheme.darkBack);
    } else {
      setMainColor(colorTheme.lightMain);
      setMidColor(colorTheme.lightMid);
      setBackColor(colorTheme.lightBack);
    }
  };

  const backgrounds = [
    "https://images2.alphacoders.com/133/1330236.png",
    "https://images5.alphacoders.com/133/1338079.png",
    "https://images7.alphacoders.com/133/1333741.png",
    "https://images.alphacoders.com/133/1339164.png",
    "https://images5.alphacoders.com/134/1344988.jpeg",
    "https://images3.alphacoders.com/133/1339873.png",
  ];

  const buttonThemes = {
    dark: {
      red: 0,
      green: 0,
      blue: 0,
    },
    light: {
      red: 255,
      green: 255,
      blue: 255,
    },
  };
  const buttonConfigs = {
    ...buttonThemes[darkMode ? "dark" : "light"],
    alpha: 1,
    size: 6,
  };

  function handleTheme() {
    setDarkMode((prev) => {
      handleThemeChange(!prev);
      return !prev;
    });
  }
  function handleStart() {}
  return (
    <div className="w-full h-full relative">
      <section
        className="w-full h-full absolute flex justify-start pt-20 items-start bg-cover"
        style={{
          backgroundImage: `url(${backgrounds[4]})`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <button
          onClick={handleStart}
          className="w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center group"
        >
          <ChevronDown
            size={128}
            className={`group-hover:animate-bounce transition-all`}
            style={{
              color: `${mainColor}`,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </button>
      </section>
      <nav
        className={`w-full h-20 absolute top-0 flex justify-evenly items-center border-b-2 shadow-lg backdrop-blur-sm`}
        style={{
          borderColor: `${backColor}`,
          backgroundColor: `${backColor}`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <MenuButton {...buttonConfigs} />
        <h1
          className="select-none text-5xl font-bold capitalize animate-onload-up"
          style={{
            color: `${mainColor}`,
            transition: "all 0.3s ease-in-out",
          }}
        >
          waifufu
        </h1>
        <button
          className={`w-[64px] h-[32px] relative rounded-full`}
          style={{ backgroundColor: `${midColor}` }}
          onClick={() => handleTheme()}
        >
          <div
            className={`absolute -top-[2px] right-0 flex items-center rounded-full border-2`}
            style={{
              transform: `translateX(${darkMode ? -32 : 0}px)`,
              backgroundColor: `${
                darkMode ? colorTheme.lightBack : colorTheme.darkBack
              }`,
              borderColor: `${
                darkMode ? colorTheme.darkMain : colorTheme.lightMid
              }`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {darkMode ? (
              <Moon
                size={32}
                style={{
                  stroke: `${midColor}`,
                  fill: `${mainColor}`,
                  transition: "all 0.3s ease-in-out",
                }}
              />
            ) : (
              <Sun
                size={32}
                style={{
                  stroke: `${mainColor}`,
                  transition: "all 0.3s ease-in-out",
                }}
              />
            )}
          </div>
        </button>
      </nav>
    </div>
  );
}
