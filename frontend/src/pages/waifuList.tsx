import { useDeferredValue, useMemo, useState } from "react";
import type { WaifuData } from "../api/waifus/model";
import CharacterFilters, {
  type CharacterSort,
  type CharacterViewMode,
} from "../components/characters/CharacterFilters";
import CharacterGrid from "../components/characters/CharacterGrid";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";

interface WaifuListProps {
  waifus: WaifuData[];
  onOpenWaifu: (waifu: WaifuData) => void;
  onAddWaifu: () => void;
  onEditWaifu: (waifu: WaifuData) => void;
  onDeleteWaifu: (waifu: WaifuData) => void;
  onToggleFavorite: (waifu: WaifuData) => void;
  onResetWaifus: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function WaifuList({
  waifus,
  onOpenWaifu,
  onAddWaifu,
  onEditWaifu,
  onDeleteWaifu,
  onToggleFavorite,
  onResetWaifus,
  isLoading = false,
  error = null,
}: WaifuListProps) {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState("all");
  const [sort, setSort] = useState<CharacterSort>("name");
  const [viewMode, setViewMode] = useState<CharacterViewMode>("grid");
  const deferredQuery = useDeferredValue(query);

  const origins = useMemo(
    () =>
      Array.from(
        new Set(
          waifus
            .map((waifu) => waifu.origin)
            .filter((originName): originName is string => Boolean(originName)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [waifus],
  );

  const filteredWaifus = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return waifus
      .filter((waifu) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          waifu.name.toLowerCase().includes(normalizedQuery) ||
          Boolean(waifu.origin?.toLowerCase().includes(normalizedQuery));
        const matchesOrigin = origin === "all" || waifu.origin === origin;

        return matchesQuery && matchesOrigin;
      })
      .sort((firstWaifu, secondWaifu) => {
        if (sort === "favorite") {
          return Number(secondWaifu.favorite) - Number(firstWaifu.favorite);
        }

        const firstValue =
          sort === "origin" ? (firstWaifu.origin ?? "") : firstWaifu.name;
        const secondValue =
          sort === "origin" ? (secondWaifu.origin ?? "") : secondWaifu.name;

        return firstValue.localeCompare(secondValue);
      });
  }, [deferredQuery, origin, sort, waifus]);

  const hasFilters = query.trim().length > 0 || origin !== "all";

  return (
    <section className="list-page">
      <CharacterFilters
        total={waifus.length}
        origins={origins}
        query={query}
        origin={origin}
        sort={sort}
        viewMode={viewMode}
        onQueryChange={setQuery}
        onOriginChange={setOrigin}
        onSortChange={setSort}
        onViewModeChange={setViewMode}
        onAddWaifu={onAddWaifu}
        onReset={onResetWaifus}
      />

      {isLoading ? <LoadingState /> : null}
      {error ? (
        <ErrorState description={error} onRetry={onResetWaifus} />
      ) : null}
      {!isLoading && !error ? (
        <CharacterGrid
          waifus={filteredWaifus}
          viewMode={viewMode}
          hasFilters={hasFilters}
          onOpen={onOpenWaifu}
          onEdit={onEditWaifu}
          onDelete={onDeleteWaifu}
          onToggleFavorite={onToggleFavorite}
          onAddWaifu={onAddWaifu}
        />
      ) : null}
    </section>
  );
}
