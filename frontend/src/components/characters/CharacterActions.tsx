import { Heart, Pencil, Trash2 } from "lucide-react";
import type { WaifuData } from "../../api/waifus/model";
import { getWaifuVisualStyle } from "../../features/waifus/visual";

interface CharacterActionsProps {
  waifu: WaifuData;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export default function CharacterActions({
  waifu,
  onEdit,
  onDelete,
  onToggleFavorite,
}: CharacterActionsProps) {
  return (
    <div className="character-actions" style={getWaifuVisualStyle(waifu)}>
      <button
        aria-pressed={Boolean(waifu.favorite)}
        className="btn btn--primary"
        type="button"
        onClick={onToggleFavorite}
      >
        <Heart
          aria-hidden="true"
          fill={waifu.favorite ? "currentColor" : "none"}
        />
        {waifu.favorite ? "Favorited" : "Favorite"}
      </button>
      <button className="btn btn--secondary" type="button" onClick={onEdit}>
        <Pencil aria-hidden="true" />
        Edit
      </button>
      <button
        className="btn btn--ghost-danger"
        type="button"
        onClick={onDelete}
      >
        <Trash2 aria-hidden="true" />
        Delete
      </button>
    </div>
  );
}
