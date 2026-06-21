import clsx from "clsx";
import { useEffect, useState } from "react";
import type { WaifuData } from "../../api/waifus/model";
import { getWaifuVisualStyle } from "../../features/waifus/visual";

interface CharacterThumbnailProps {
  waifu: WaifuData;
  isActive: boolean;
  onSelect: () => void;
}

export default function CharacterThumbnail({
  waifu,
  isActive,
  onSelect,
}: CharacterThumbnailProps) {
  const imageUrl = waifu.backgroundUrl;
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [imageUrl]);

  return (
    <button
      aria-label={`Open ${waifu.name}`}
      aria-current={isActive ? "true" : undefined}
      className={clsx("character-thumb", isActive && "is-active")}
      style={getWaifuVisualStyle(waifu)}
      title={waifu.name}
      type="button"
      onClick={onSelect}
    >
      {imageUrl && !hasImageError ? (
        <img
          alt=""
          decoding="async"
          loading="lazy"
          src={imageUrl}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span aria-hidden="true">{waifu.name.charAt(0)}</span>
      )}
    </button>
  );
}
