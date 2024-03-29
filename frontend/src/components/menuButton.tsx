import { useSpring, animated } from "@react-spring/web";
import { CSSProperties, FocusEvent, useEffect, useRef, useState } from "react";

interface MenuButtonProps {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  size: number;
  children: React.ReactNode;
}

export default function MenuButton({
  red,
  green,
  blue,
  alpha,
  size,
  children,
}: MenuButtonProps) {
  const aspectRatio = [6, 1];
  const alphaSleep = alpha - 0.6;
  const [width, height] = sizeConvert(size, aspectRatio);
  const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  const [opacity, setOpacity] = useState([alphaSleep, alphaSleep, alphaSleep]);
  const gap = height * 2.2;
  const [positionX, setPositionX] = useState([0, 0, 0]);
  const [positionY, setPositionY] = useState([0, gap, 2 * gap]);
  const [degrees, setDegrees] = useState([0, 0, 0]);
  const [isActive, setIsActive] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [props, api] = useSpring(
    () => ({
      from: {
        opacity: 0,
        y: -100,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    []
  );

  useEffect(() => {
    if (isActive === true) {
      setShowChildren(true);
      api.start({
        from: {
          opacity: 0,
          y: -50,
        },
        to: {
          opacity: 1,
          y: 0,
        },
      });
    } else {
      setShowChildren(false);
    }
  }, [isActive]);

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

  function handleClick() {
    setIsActive((prevIsActive) => {
      // Toggle the value
      const newIsActive = !prevIsActive;

      // Call activate or deactivate based on the updated state
      newIsActive ? activate() : deactivate();

      // Return the new state value
      return newIsActive;
    });
  }
  function activate() {
    setPositionX([0, -50, 0]);
    setPositionY([gap, gap, gap]);
    setOpacity([alpha, 0, alpha]);
    setDegrees([45, 0, -45]);
    console.log("activated: isActive = " + isActive);
  }

  function deactivate() {
    setPositionX([0, 0, 0]);
    setPositionY([0, gap, 2 * gap]);
    setOpacity([alphaSleep, alphaSleep, alphaSleep]);
    setDegrees([0, 0, 0]);
    console.log("deactivated: isActive = " + isActive);
  }
  function handleHover() {
    if (isActive == true) return;
    setOpacity([alpha, alpha, alpha]);
  }
  function handleUnhover() {
    if (isActive == true) return;
    setOpacity([alphaSleep, alphaSleep, alphaSleep]);
  }
  function handleFocus() {
    activate();
  }
  function handleBlur(event: FocusEvent<HTMLDivElement, Element>) {
    if (
      !event.relatedTarget ||
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setIsActive(false);
      deactivate();
    }
  }

  return (
    <div onBlur={(e) => handleBlur(e)} className="w-auto h-auto relative">
      <button
        ref={buttonRef}
        className="mx-5 flex justify-center items-center"
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        onFocus={handleFocus}
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
                zIndex: 2,
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
      {showChildren && (
        <animated.div
          className="w-[300px] h-auto px-5 absolute top-[59px] left-0 flex flex-col"
          style={props}
        >
          {children}
        </animated.div>
      )}
    </div>
  );
}

function sizeConvert(size: number, aspectRatio: number[]) {
  const width = size * aspectRatio[0];
  const height = size * aspectRatio[1];
  return [width, height];
}
