import { MouseParallax } from "react-just-parallax";
import image1 from "../public/images/1.jpeg";
import image2 from "../public/images/2.jpg";
import image3 from "../public/images/3.jpeg";
import image4 from "../public/images/4.jpeg";
import image5 from "../public/images/5.jpeg";
import { useEffect, useState } from "react";

export default function Background() {
  const backgrounds = [image1, image2, image3, image4, image5];
  const [backgroundIndex, setBackgroundIndex] = useState(
    Math.floor(Math.random() * backgrounds.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => {
        return (prevIndex + 1) % backgrounds.length;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
            transition: "background 0.5s ease-out",
          }}
        ></div>
      </MouseParallax>
    </>
  );
}
