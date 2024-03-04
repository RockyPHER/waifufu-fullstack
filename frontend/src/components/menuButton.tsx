import { CSSProperties, useRef, useState } from "react";

interface MenuButtonProps {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  size: number;
}

export default function MenuButton({
  red,
  green,
  blue,
  alpha,
  size,
}: MenuButtonProps) {
  const aspectRatio = [5, 1];
  const reduOpacity = alpha - 0.6;
  const [width, height] = sizeConvert(size, aspectRatio);
  const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  const [opacity, setOpacity] = useState([
    reduOpacity,
    reduOpacity,
    reduOpacity,
  ]);
  const gap = height * 2;
  const [positionX, setPositionX] = useState([0, 0, 0]);
  const [positionY, setPositionY] = useState([0, gap, 2 * gap]);
  const [degrees, setDegrees] = useState([0, 0, 0]);
  const buttonSize = () => {
    let size = Math.floor(aspectRatio[0] * height).toString();
    return size + "px";
  };
  const barStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
  };

  const buttonRef = useRef(null);

  function activate() {
    setPositionX([0, -60, 0]);
    setPositionY([gap, gap, gap]);
    setOpacity([alpha, 0, alpha]);
    setDegrees([45, 0, -45]);
    return;
  }
  function deactivate() {
    setPositionX([0, 0, 0]);
    setPositionY([0, gap, 2 * gap]);
    setOpacity([reduOpacity, reduOpacity, reduOpacity]);
    setDegrees([0, 0, 0]);
    return;
  }
  function handleHover() {
    if (positionX[1] != 0) return;
    setOpacity([alpha, alpha, alpha]);
  }
  function handleUnhover() {
    if (document.activeElement == buttonRef.current) return;
    setOpacity([reduOpacity, reduOpacity, reduOpacity]);
  }
  return (
    <>
      <button
        ref={buttonRef}
        className="mx-5 flex justify-center items-center"
        onClick={handleActivate}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        onFocus={handleActivate}
        onBlur={handleDeactivate}
      >
        <div
          style={{
            position: "relative",
            width: buttonSize(),
            height: buttonSize(),
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              style={{
                ...barStyle,
                position: "absolute",
                opacity: opacity[index],
                transform: `translateY(${positionY[index]}px) translateX(${positionX[index]}px) rotate(${degrees[index]}deg)`,
                transition: "all 0.3s ease-in-out",
              }}
              key={index}
            />
          ))}
        </div>
      </button>
    </>
  );
}

function sizeConvert(size: number, aspectRatio: number[]) {
  const width = size * aspectRatio[0];
  const height = size * aspectRatio[1];
  return [width, height];
}
