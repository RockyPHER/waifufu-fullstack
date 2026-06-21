import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface BackdropProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  placement?: "center" | "end";
  labelledBy?: string;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Backdrop({
  children,
  isOpen,
  onClose,
  placement = "center",
  labelledBy,
}: BackdropProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 140 },
  });

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        previousFocusRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      const firstFocusable =
        dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 30);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {transitions(
        (style, shouldRender) =>
          shouldRender && (
            <animated.div
              style={style}
              onClick={onClose}
              className={clsx(
                "bg-black/65 absolute inset-0 z-40 flex min-h-full w-full overflow-y-auto px-3 py-4 backdrop-blur-md",
                placement === "end"
                  ? "items-stretch justify-end sm:px-0 sm:py-0"
                  : "items-start justify-center sm:items-center sm:px-4",
              )}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                className={clsx(
                  "flex w-full",
                  placement === "end" ? "justify-end" : "justify-center",
                )}
                onClick={(event) => event.stopPropagation()}
              >
                {children}
              </div>
            </animated.div>
          ),
      )}
    </>
  );
}
