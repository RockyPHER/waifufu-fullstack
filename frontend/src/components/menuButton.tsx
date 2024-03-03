import { CSSProperties, useState } from "react";

export default function MenuButton() {
  const width = 34;
  const height = 6;
  const color = "black";
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(10);
  const [degrees, setDegrees] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const barStyle: CSSProperties | undefined = {
    top: "43%",
    left: "14%",
    transform: "translateY(-50%)",
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: "9999px",
    transition: "all 0.3s ease",
  };

  const barOneStyle = {
    ...barStyle,
    transform: `rotate(${degrees}deg) translateY(${positionY}px)`,
  };
  const barTwoStyle = {
    ...barStyle,
    opacity: opacity,
    transform: `translateX(-${positionX}px)`,
  };
  const barThreeStyle = {
    ...barStyle,
    transform: `rotate(${-degrees}deg) translateY(${-positionY}px)`,
  };

  const rotateAndTranslate = (deg: number, Y: number) => {
    setDegrees(deg);
    setPositionY(Y);
  };

  function handleClick() {
    positionX == 0 ? setPositionX(60) : setPositionX(0);
    opacity == 1 ? setOpacity(0) : setOpacity(1);
    degrees == 0 ? rotateAndTranslate(45, 0) : rotateAndTranslate(0, 10);
  }

  return (
    <>
      <button
        className="mx-5 flex justify-center items-center"
        onClick={handleClick}
      >
        <div className="w-12 h-12 relative">
          <div style={barOneStyle} />
          <div style={barTwoStyle} />
          <div style={barThreeStyle} />
        </div>
      </button>
    </>
  );
}
