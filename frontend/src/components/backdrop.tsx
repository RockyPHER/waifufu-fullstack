import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
interface BackdropProps {
  children: JSX.Element;
  isOpen: boolean;
}

export default function Backdrop({ children, isOpen }: BackdropProps) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [props, api] = useSpring(() => ({
    from: {
      opacity: 0,
    },
  }));

  useEffect(() => {
    if (isOpen) {
      setOpenBackdrop(true);
      api.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      });
    } else {
      setTimeout(() => {
        setOpenBackdrop(false);
      }, 200);
      api.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    }
  }, [isOpen]);
  return (
    <>
      {openBackdrop && (
        <animated.div
          style={{ ...props }}
          className="w-screen h-screen absolute z-30 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm transition-all"
        >
          {children}
        </animated.div>
      )}
    </>
  );
}
