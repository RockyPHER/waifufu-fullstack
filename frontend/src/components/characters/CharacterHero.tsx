import clsx from "clsx";
import { Film, Plus } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { WaifuData } from "../../api/waifus/model";
import {
  getWaifuVisual,
  getWaifuVisualStyle,
} from "../../features/waifus/visual";
import EmptyState from "../ui/EmptyState";
import CharacterActions from "./CharacterActions";
import CharacterCarousel from "./CharacterCarousel";
import CharacterInfo from "./CharacterInfo";

interface CharacterHeroProps {
  waifus: WaifuData[];
  activeWaifu?: WaifuData;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (waifu: WaifuData) => void;
  onAddWaifu: () => void;
  onEditWaifu: (waifu: WaifuData) => void;
  onDeleteWaifu: (waifu: WaifuData) => void;
  onToggleFavorite: (waifu: WaifuData) => void;
}

export default function CharacterHero({
  waifus,
  activeWaifu,
  onPrevious,
  onNext,
  onSelect,
  onAddWaifu,
  onEditWaifu,
  onDeleteWaifu,
  onToggleFavorite,
}: CharacterHeroProps) {
  // Displayed bg URL is swapped at peak-dark to hide the image change
  const [currentBgUrl, setCurrentBgUrl] = useState<string | undefined>(
    activeWaifu?.backgroundUrl,
  );
  const [currentBgKey, setCurrentBgKey] = useState(0);
  const [backgroundStatus, setBackgroundStatus] = useState<
    "loading" | "loaded" | "error"
  >(activeWaifu?.backgroundUrl ? "loading" : "error");

  const [displayedWaifu, setDisplayedWaifu] = useState<WaifuData | undefined>(
    activeWaifu,
  );
  const [isContentFading, setIsContentFading] = useState(false);
  const [isBgDark, setIsBgDark] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const prevWaifuIdRef = useRef<number | undefined>(activeWaifu?.id);
  const swapTimerRef = useRef<number>(0);

  useEffect(() => {
    setBackgroundStatus(currentBgUrl ? "loading" : "error");
  }, [currentBgUrl]);

  useEffect(() => {
    const prevId = prevWaifuIdRef.current;
    prevWaifuIdRef.current = activeWaifu?.id;

    // First render or same waifu — sync immediately, no animation
    if (prevId === undefined || prevId === activeWaifu?.id) {
      setDisplayedWaifu(activeWaifu);
      setCurrentBgUrl(activeWaifu?.backgroundUrl);
      return;
    }

    // Start: content fades out + background darkens
    setIsContentFading(true);
    setIsBgDark(true);

    // At peak-dark: swap everything at once, then reveal
    clearTimeout(swapTimerRef.current);
    swapTimerRef.current = window.setTimeout(() => {
      setDisplayedWaifu(activeWaifu);
      setTransitionKey((k) => k + 1);
      setIsContentFading(false);
      setCurrentBgUrl(activeWaifu?.backgroundUrl);
      setCurrentBgKey((k) => k + 1);
      setIsBgDark(false);
    }, 200);

    return () => clearTimeout(swapTimerRef.current);
  }, [activeWaifu?.id]);

  if (!activeWaifu) {
    return (
      <div className="hero-empty">
        <EmptyState
          Icon={Film}
          title="No waifus in the archive"
          description="Create the first profile to start the cinematic showcase."
          action={
            <button
              className="btn btn--primary"
              type="button"
              onClick={onAddWaifu}
            >
              <Plus aria-hidden="true" />
              Add Waifu
            </button>
          }
        />
      </div>
    );
  }

  const visual = getWaifuVisual(activeWaifu);
  const overlayAlpha = visual.overlayStrength;

  return (
    <section
      className="character-hero"
      style={getWaifuVisualStyle(activeWaifu)}
    >
      {currentBgUrl && backgroundStatus !== "error" ? (
        <img
          key={currentBgKey}
          alt={`${activeWaifu.name} background`}
          className="character-hero__background"
          decoding="async"
          loading="eager"
          src={currentBgUrl}
          style={{
            objectPosition: visual.focalPoint,
            transform: `scale(${visual.zoom})`,
          }}
          onError={() => setBackgroundStatus("error")}
          onLoad={() => setBackgroundStatus("loaded")}
        />
      ) : (
        <div className="character-hero__fallback" />
      )}

      {backgroundStatus === "loading" ? (
        <div className="character-hero__loading" aria-hidden="true" />
      ) : null}

      <div
        className="character-hero__overlay"
        style={{ "--hero-overlay-alpha": overlayAlpha } as CSSProperties}
      />

      {/* Vignette that darkens during waifu transition */}
      <div
        className={clsx(
          "character-hero__bg-vignette",
          isBgDark && "is-dark",
        )}
        aria-hidden="true"
      />

      <div className="character-hero__content">
        <div
          key={transitionKey}
          className={clsx(
            "character-hero__copy",
            isContentFading && "is-fading",
          )}
        >
          <span className="eyebrow">
            <span aria-hidden="true" />
            {displayedWaifu?.origin ?? "Local archive"}
          </span>
          <h1>{displayedWaifu?.name}</h1>
          <p>
            {displayedWaifu?.description ??
              "A curated profile from the local Waifufu archive."}
          </p>
          {displayedWaifu && <CharacterInfo waifu={displayedWaifu} />}
          {displayedWaifu && (
            <CharacterActions
              waifu={displayedWaifu}
              onEdit={() => onEditWaifu(displayedWaifu)}
              onDelete={() => onDeleteWaifu(displayedWaifu)}
              onToggleFavorite={() => onToggleFavorite(displayedWaifu)}
            />
          )}
        </div>
      </div>

      <div className="character-hero__carousel">
        <CharacterCarousel
          waifus={waifus}
          activeId={activeWaifu.id}
          onPrevious={onPrevious}
          onNext={onNext}
          onSelect={onSelect}
          onAddWaifu={onAddWaifu}
        />
      </div>
    </section>
  );
}
