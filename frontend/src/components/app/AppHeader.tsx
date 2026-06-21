import clsx from "clsx";
import { Grid2X2, Home, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Scene } from "../../features/app/scene";

interface AppHeaderProps {
  activeScene: Scene;
  onNavigate: (scene: Scene) => void;
}

const navItems = [
  { scene: "home", label: "Home", Icon: Home },
  { scene: "list", label: "WaifuList", Icon: Grid2X2 },
] as const;

const HIDE_DELAY = 3000;
const PROXIMITY_THRESHOLD = 80;

export default function AppHeader({
  activeScene,
  onNavigate,
}: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef<number>(0);
  // ref keeps event handlers up-to-date without re-registering them
  const activeSceneRef = useRef(activeScene);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  function scheduleHide() {
    if (activeSceneRef.current === "list") return;
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setIsVisible(false), HIDE_DELAY);
  }

  function showHeader() {
    clearTimeout(hideTimerRef.current);
    setIsVisible(true);
    if (activeSceneRef.current !== "list") {
      hideTimerRef.current = window.setTimeout(() => setIsVisible(false), HIDE_DELAY);
    }
  }

  // Register global mouse/touch listeners once
  useEffect(() => {
    scheduleHide();

    function handleMouseMove(e: MouseEvent) {
      if (activeSceneRef.current === "list") return;
      if (e.clientY < PROXIMITY_THRESHOLD) {
        showHeader();
      }
    }

    function handleTouchStart() {
      showHeader();
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      clearTimeout(hideTimerRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // Show and keep visible when navigating to list; restart timer on home
  useEffect(() => {
    if (activeScene === "list") {
      clearTimeout(hideTimerRef.current);
      setIsVisible(true);
    } else {
      scheduleHide();
    }
  }, [activeScene]);

  // Keep visible while mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      clearTimeout(hideTimerRef.current);
      setIsVisible(true);
    } else {
      scheduleHide();
    }
  }, [isMenuOpen]);

  function handleNavigate(scene: Scene) {
    onNavigate(scene);
    setIsMenuOpen(false);
  }

  return (
    <>
      {/* Subtle glow hint at the top edge when header is hidden on home */}
      {!isVisible && activeScene === "home" && (
        <div className="app-header__hint" aria-hidden="true" />
      )}

      <header className={clsx("app-header", !isVisible && "is-hidden")}>
        <a
          className="app-header__brand"
          href="#home"
          onClick={() => handleNavigate("home")}
        >
          <span className="app-header__mark" aria-hidden="true">
            W
          </span>
          <span>Waifufu</span>
        </a>

        <nav className="app-header__nav" aria-label="Primary navigation">
          {navItems.map(({ scene, label, Icon }) => (
            <button
              key={scene}
              className={clsx("nav-link", activeScene === scene && "is-active")}
              type="button"
              onClick={() => handleNavigate(scene)}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="app-header__actions">
          <button
            aria-expanded={isMenuOpen}
            aria-label="Open mobile menu"
            className="icon-button app-header__menu"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mobile-nav">
            {navItems.map(({ scene, label, Icon }) => (
              <button
                key={scene}
                className={clsx(
                  "mobile-nav__item",
                  activeScene === scene && "is-active",
                )}
                type="button"
                onClick={() => handleNavigate(scene)}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </header>
    </>
  );
}
