import { useEffect, useState } from "react";
import Home from "./pages/home";
import { Slider } from "./pages/slider";

export default function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openSlider, setOpenSlider] = useState(false);

  const [onChange, setOnChange] = useState([true, false]);

  useEffect(() => {
    if (onChange[0] === true) {
      setTimeout(() => {
        setOpenSlider(false);
      }, 450);
      setOpenHome(true);
    } else if (onChange[1] === true) {
      setTimeout(() => {
        setOpenHome(false);
      }, 450);
      setOpenSlider(true);
    }
  }, [onChange]);

  return (
    <main className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
      {openHome ? <Home onChange={onChange} setOnChange={setOnChange} /> : null}
      {openSlider ? (
        <Slider onChange={onChange} setOnChange={setOnChange} />
      ) : null}
    </main>
  );
}
