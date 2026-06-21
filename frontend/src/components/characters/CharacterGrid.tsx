import type { WaifuData } from "../../api/waifus/model";
import EmptyState from "../ui/EmptyState";
import CharacterCard from "./CharacterCard";
import type { CharacterViewMode } from "./CharacterFilters";

interface CharacterGridProps {
  waifus: WaifuData[];
  viewMode: CharacterViewMode;
  hasFilters: boolean;
  onOpen: (waifu: WaifuData) => void;
  onEdit: (waifu: WaifuData) => void;
  onDelete: (waifu: WaifuData) => void;
  onToggleFavorite: (waifu: WaifuData) => void;
  onAddWaifu: () => void;
}

export default function CharacterGrid({
  waifus,
  viewMode,
  hasFilters,
  onOpen,
  onEdit,
  onDelete,
  onToggleFavorite,
  onAddWaifu,
}: CharacterGridProps) {
  if (waifus.length === 0) {
    return (
      <EmptyState
        title={hasFilters ? "No matches found" : "The archive is empty"}
        description={
          hasFilters
            ? "Try a different search, origin or sort option."
            : "Add a character profile to start the gallery."
        }
        action={
          hasFilters ? null : (
            <button
              className="btn btn--primary"
              type="button"
              onClick={onAddWaifu}
            >
              Add Waifu
            </button>
          )
        }
      />
    );
  }

  return (
    <section className={`character-grid character-grid--${viewMode}`}>
      {waifus.map((waifu) => (
        <CharacterCard
          key={waifu.id}
          waifu={waifu}
          viewMode={viewMode}
          onOpen={() => onOpen(waifu)}
          onEdit={() => onEdit(waifu)}
          onDelete={() => onDelete(waifu)}
          onToggleFavorite={() => onToggleFavorite(waifu)}
        />
      ))}
    </section>
  );
}
