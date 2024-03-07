import { useEffect, useState } from "react";
import Home from "./pages/home";
import { Slider } from "./pages/slider";

export default function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openSlider, setOpenSlider] = useState(false);

  const [transition, setTransition] = useState(false);

  function transitionHandle() {
    if (transition) {
      return "translateY(-100%)";
    } else {
      return "translateY(0)";
    }
  }

  useEffect(() => {
    if (transition) {
      setTimeout(() => {
        setOpenSlider(true);
        setOpenHome(false);
      }, 300);
    }
  }, [transition]);

  return (
    <main className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
      {openHome ? <Home setTransition={setTransition} /> : null}
      {transition ? (
        <div className="w-full h-full absolute top-0 left-0 bg-black animate-opload backdrop-blur transition-all" />
      ) : null}
      {openSlider ? <Slider /> : null}
    </main>
  );
}
