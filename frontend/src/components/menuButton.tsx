import { CSSProperties, useRef, useState } from "react";

export default function MenuButton() {
  const width = 34;
  const height = 4;
  const [colorOpacity, setColorOpacity] = useState(0.7);
  const color = `rgba(255, 255, 255, ${colorOpacity})`;
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(10);
  const [degrees, setDegrees] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const buttonRef = useRef(null);

  const barStyle: CSSProperties | undefined = {
    top: "43%",
    left: "14%",
    transform: "translateY(-50%)",
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
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

  function handleFocus() {
    setColorOpacity(1);
  }
  function handleBlur() {
    if (document.activeElement == buttonRef.current) return;
    setColorOpacity(0.7);
  }
  return (
    <>
      <button
        ref={buttonRef}
        className="mx-5 flex justify-center items-center"
        onClick={handleClick}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
