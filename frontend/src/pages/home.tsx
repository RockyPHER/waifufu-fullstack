import {
  ChevronDown,
  List,
  ListIcon,
  Moon,
  PlusIcon,
  SquareUser,
  Sun,
} from "lucide-react";
import MenuButton from "../components/menuButton";
import { useEffect, useRef, useState } from "react";

import Backdrop from "../components/backdrop";
import WaifuList from "../components/waifuList";
import WaifuForm from "../components/waifuForm";
import Background from "../components/background";

interface HomeProps {
  onChange: boolean[];
  setOnChange: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export default function Home({ onChange, setOnChange }: HomeProps) {
  const colorSchemes = {
    dark: {
      primary: "rgba(235, 225, 225, 1)",
      primary_1: "rgba(225, 225, 235, 0.5)",
      background: "rgba(30, 30, 45, 0.2)",
      background_1: "rgba(20, 20, 25, 0.3)",
      background_2: "rgba(10, 10, 15, 0.4)",
      surface: "rgba(140, 140, 145, 0.6)",
      surface_1: "rgba(110, 110, 115, 0.4)",
      surface_2: "rgba(90, 90, 95, 0.2)",
    },
    light: {
      primary: "rgba(25, 25, 30, 1)",
      primary_1: "rgba(50, 50, 55, 0.5)",
      background: "rgba(210, 200, 200, 0.2)",
      background_1: "rgba(155, 140, 140, 0.3)",
      background_2: "rgba(125, 120, 120, 0.4)",
      surface: "rgba(255, 250, 245, 0.5)",
      surface_1: "rgba(240, 230, 230, 0.4)",
      surface_2: "rgba(230, 220, 220, 0.6)",
    },
  };
  const optionIcon = [<SquareUser />, <List />];

  const optionName = ["My portfolio", "Waifulist"];
  const [darkMode, setDarkMode] = useState(true);
  const [colorScheme, setColorScheme] = useState(colorSchemes.dark);
  const firstLoad = useRef(true);

  const [openWaifuList, setOpenWaifuList] = useState(false);
  const [openWaifuForm, setOpenWaifuForm] = useState(false);

  const handleThemeChange = (bool: boolean) => {
    if (bool === true) {
      setColorScheme(colorSchemes.dark);
    } else {
      setColorScheme(colorSchemes.light);
    }
  };

  const buttonThemes = {
    dark: {
      red: 25,
      green: 25,
      blue: 30,
    },
    light: {
      red: 235,
      green: 225,
      blue: 225,
    },
  };
  const buttonConfigs = {
    ...buttonThemes[darkMode ? "light" : "dark"],
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
    console.log("Color Scheme:", colorScheme);
    const root = document.documentElement;
    console.log("root: " + root);
    root.style.setProperty("--primary-color", colorScheme.primary);
    root.style.setProperty("--primary-color-1", colorScheme.primary_1);
    root.style.setProperty("--surface-color", colorScheme.surface);
    root.style.setProperty("--surface-color-1", colorScheme.surface_1);
    root.style.setProperty(
      "--background-color-hover",
      colorScheme.background_1
    );
    root.style.setProperty(
      "--background-color-active",
      colorScheme.background_2
    );
    root.style.setProperty("--background-color", colorScheme.background);
  }, [colorScheme]);

  function openListHandle() {
    setOpenWaifuList(true);
  }
  function openFormHandle() {
    setOpenWaifuForm(true);
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden absolute"
      style={onChangeHandler()}
    >
      <Backdrop isOpen={openWaifuList}>
        <WaifuList setIsOpen={setOpenWaifuList} />
      </Backdrop>
      <Backdrop isOpen={openWaifuForm}>
        <WaifuForm editMode={false} setIsOpen={setOpenWaifuForm} />
      </Backdrop>
      {/* background */}
      <Background />
      {/* main container */}
      <section
        className="w-full h-full absolute flex justify-start pt-20 items-start bg-cover"
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <button
          onClick={handleOpenSlider}
          className="w-1/3 h-auto z-10 absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center group"
        >
          <ChevronDown
            size={128}
            className={`chevron-down group-hover:animate-bounce group-active:scale-90 group-active:animate-none transition-all`}
          />
        </button>
        <div className="w-auto h-auto z-10 absolute bottom-10 right-20 flex gap-2">
          <button
            onClick={openListHandle}
            className="home-button p-2 border-2 rounded-full"
          >
            <ListIcon className="w-14 h-14" />
          </button>
          <button
            onClick={openFormHandle}
            className="home-button p-1 border-2 rounded-full"
            style={{}}
          >
            <PlusIcon className="w-16 h-16" />
          </button>
        </div>
      </section>
      {/* navbar */}
      <nav
        className={`w-full h-20 z-20 absolute top-0 flex justify-evenly items-center animate-onload-up border-b-2 shadow-lg backdrop-blur-sm`}
        style={{
          borderColor: `${colorScheme.surface}`,
          backgroundColor: `${colorScheme.background}`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <MenuButton {...buttonConfigs}>
          {Array.from({ length: optionIcon.length }, (_, index) => (
            <button
              className="dropdown w-full h-auto py-2 px-2 flex justify-between items-center border-b text-xl]"
              style={{
                borderColor: `${colorScheme.surface_1}`,
                color: `${colorScheme.primary}`,
              }}
              onClick={() =>
                optionName[index] == "Waifulist"
                  ? openListHandle()
                  : (location.href = "/")
              }
            >
              {optionIcon[index]}
              <p className="">{optionName[index]}</p>
            </button>
          ))}
        </MenuButton>
        <h1
          className="select-none text-5xl font-bold capitalize"
          style={{
            color: `${colorScheme.primary}`,
            transition: "all 0.3s ease-in-out",
          }}
        >
          waifufu
        </h1>
        <button
          className={`w-[64px] h-[32px] relative rounded-full`}
          style={{
            backgroundColor: `${colorScheme.surface_2}`,
          }}
          onClick={() => handleTheme()}
        >
          <div
            className={`toggle-theme absolute -top-[2px] right-0 flex items-center rounded-full border-2`}
            style={{
              transform: `translateX(${darkMode ? -32 : 0}px)`,
              backgroundColor: `${colorScheme.surface_1}`,
              borderColor: `${colorScheme.surface}`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {!darkMode ? (
              <Sun
                size={32}
                style={{
                  stroke: `${colorScheme.primary}`,
                  transition: "all 0.3s ease-in-out",
                }}
              />
            ) : (
              <Moon
                size={32}
                style={{
                  stroke: `${colorScheme.primary}`,
                  fill: `${colorScheme.surface}`,
                  transition: "all 0.3s ease-in-out",
                }}
              />
            )}
          </div>
        </button>
      </nav>
      <div className="home-vignette" />
    </div>
  );
}
