import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import type { WaifuData } from "../../api/waifus/model";
import CharacterThumbnail from "./CharacterThumbnail";

interface CharacterCarouselProps {
  waifus: WaifuData[];
  activeId?: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (waifu: WaifuData) => void;
  onAddWaifu: () => void;
}

export default function CharacterCarousel({
  waifus,
  activeId,
  onPrevious,
  onNext,
  onSelect,
  onAddWaifu,
}: CharacterCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const activeThumb = trackRef.current.querySelector<HTMLElement>(".character-thumb.is-active");
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <div className="character-carousel" aria-label="Character navigation">
      <button
        aria-label="Previous character"
        className="icon-button"
        type="button"
        onClick={onPrevious}
        disabled={waifus.length <= 1}
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <div className="character-carousel__track" ref={trackRef}>
        {waifus.map((waifu) => (
          <CharacterThumbnail
            key={waifu.id}
            waifu={waifu}
            isActive={waifu.id === activeId}
            onSelect={() => onSelect(waifu)}
          />
        ))}
        <button
          aria-label="Add new waifu"
          className="character-thumb character-thumb--add"
          type="button"
          onClick={onAddWaifu}
        >
          <Plus aria-hidden="true" />
        </button>
      </div>

      <button
        aria-label="Next character"
        className="icon-button"
        type="button"
        onClick={onNext}
        disabled={waifus.length <= 1}
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
