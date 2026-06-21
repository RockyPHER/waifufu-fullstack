import { Heart, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { WaifuData } from "../../api/waifus/model";
import { getWaifuVisualStyle } from "../../features/waifus/visual";

interface CharacterCardProps {
  waifu: WaifuData;
  viewMode: "grid" | "list";
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export default function CharacterCard({
  waifu,
  viewMode,
  onOpen,
  onEdit,
  onDelete,
  onToggleFavorite,
}: CharacterCardProps) {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >(waifu.backgroundUrl ? "loading" : "error");

  useEffect(() => {
    setImageStatus(waifu.backgroundUrl ? "loading" : "error");
  }, [waifu.backgroundUrl]);

  function stopCardAction(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  return (
    <article
      className={`character-card character-card--${viewMode}`}
      style={getWaifuVisualStyle(waifu)}
    >
      <button
        className="character-card__main"
        type="button"
        onClick={onOpen}
        aria-label={`Open ${waifu.name}`}
      >
        <div className="character-card__media">
          {waifu.backgroundUrl && imageStatus !== "error" ? (
            <img
              alt={`${waifu.name} thumbnail`}
              decoding="async"
              loading="lazy"
              src={waifu.backgroundUrl}
              onError={() => setImageStatus("error")}
              onLoad={() => setImageStatus("loaded")}
            />
          ) : (
            <div className="character-card__fallback">
              <span>{waifu.name.charAt(0)}</span>
            </div>
          )}
          {imageStatus === "loading" ? (
            <div className="image-loading" aria-hidden="true" />
          ) : null}
          <div className="character-card__shade" />
          <div className="character-card__meta">
            <span>{waifu.origin ?? "Unknown origin"}</span>
            <h3>{waifu.name}</h3>
          </div>
        </div>
      </button>

      <div className="character-card__actions">
        <button
          aria-label={waifu.favorite ? "Remove favorite" : "Favorite"}
          aria-pressed={Boolean(waifu.favorite)}
          className="icon-button"
          type="button"
          onClick={(event) => {
            stopCardAction(event);
            onToggleFavorite();
          }}
        >
          <Heart
            aria-hidden="true"
            fill={waifu.favorite ? "currentColor" : "none"}
          />
        </button>
        <button
          aria-label={`Edit ${waifu.name}`}
          className="icon-button"
          type="button"
          onClick={(event) => {
            stopCardAction(event);
            onEdit();
          }}
        >
          <Pencil aria-hidden="true" />
        </button>
        <button
          aria-label={`Delete ${waifu.name}`}
          className="icon-button icon-button--danger"
          type="button"
          onClick={(event) => {
            stopCardAction(event);
            onDelete();
          }}
        >
          <Trash2 aria-hidden="true" />
        </button>
        <MoreHorizontal aria-hidden="true" className="character-card__more" />
      </div>
    </article>
  );
}
