import { ChevronDown, Moon, Sun } from "lucide-react";
import MenuButton from "../components/menuButton";
import { useEffect, useRef, useState } from "react";
import { MouseParallax } from "react-just-parallax";

import image1 from "../public/images/1.png";
import image2 from "../public/images/2.jpg";
import image3 from "../public/images/3.jpeg";
import image4 from "../public/images/4.jpeg";
import image5 from "../public/images/5.jpeg";
import image6 from "../public/images/6.jpeg";

interface HomeProps {
  onChange: boolean[];
  setOnChange: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export default function Home({ onChange, setOnChange }: HomeProps) {
  const colorTheme = {
    darkMain: "rgba(0, 0, 0, 1)",
    darkMid: "rgba(100, 100, 100, 0.5)",
    darkBack: "rgba(0, 0, 0, 0.1)",
    lightMain: "rgba(255, 255, 255, 1)",
    lightMid: "rgba(255, 255, 255, 0.3)",
    lightBack: "rgba(255, 255, 255, 0.1)",
  };
  const [darkMode, setDarkMode] = useState(false);
  const [mainColor, setMainColor] = useState(colorTheme.lightMain);
  const [midColor, setMidColor] = useState(colorTheme.lightMid);
  const [backColor, setBackColor] = useState(colorTheme.lightBack);
  const firstLoad = useRef(true);

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

  const backgrounds = [image1, image2, image3, image4, image5, image6];
  const [backgroundIndex, setBackgroundIndex] = useState(
    Math.floor(Math.random() * backgrounds.length)
  );

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

  function handleOpenSlider() {
    onChangeHandler();
    setOnChange([false, true]);
  }
  function onChangeHandler() {
    if (firstLoad.current === false) {
      firstLoad.current = true;
      return styleOnLoad;
    } else {
      if (onChange[0] === true) {
        return styleOnChange;
      } else if (onChange[1] === true) {
        return styleOnLoad;
      }
    }
  }
  useEffect(() => {
    onChangeHandler();
  }, [onChange]);

  const styleOnChange = {
    zIndex: 2,
    animation: "slideIn 0.5s ease-in-out",
  };
  const styleOnLoad = {
    zIndex: 0,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => {
        const newIndex = Math.floor(Math.random() * backgrounds.length);
        return newIndex !== prevIndex
          ? newIndex
          : (newIndex + 1) % backgrounds.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden absolute"
      style={onChangeHandler()}
    >
      <MouseParallax
        lerpEase={0.1}
        strength={0.02}
        isAbsolutelyPositioned
        shouldResetPosition
      >
        <div
          className="w-screen h-screen absolute top-0 left-0 bg-cover"
          style={{
            backgroundImage: `url(${backgrounds[backgroundIndex]})`,
            transition: "background 1s ease-in-out",
          }}
        ></div>
      </MouseParallax>
      <section
        className="w-full h-full absolute flex justify-start pt-20 items-start bg-cover"
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <button
          onClick={handleOpenSlider}
          className="w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center group"
        >
          <ChevronDown
            size={128}
            className={`group-hover:animate-bounce group-active:scale-90 group-active:animate-none transition-all`}
            style={{
              color: `${mainColor}`,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </button>
      </section>
      <nav
        className={`w-full h-20 absolute top-0 flex justify-evenly items-center animate-onload-up border-b-2 shadow-lg backdrop-blur-sm`}
        style={{
          borderColor: `${backColor}`,
          backgroundColor: `${backColor}`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <MenuButton {...buttonConfigs} />
        <h1
          className="select-none text-5xl font-bold capitalize"
          style={{
            color: `${mainColor}`,
            transition: "all 0.3s ease-in-out",
          }}
        >
          waifufu
        </h1>
        <button
          className={`w-[64px] h-[32px] relative rounded-full`}
          style={{
            backgroundColor: `${midColor}`,
          }}
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
                darkMode ? colorTheme.lightMid : colorTheme.lightMid
              }`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {darkMode ? (
              <Moon
                size={32}
                style={{
                  stroke: `${
                    darkMode ? colorTheme.lightBack : colorTheme.darkBack
                  }`,
                  fill: `${
                    darkMode ? colorTheme.lightMid : colorTheme.darkBack
                  }`,
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
