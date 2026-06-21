import { ArrowDownAZ, Grid2X2, List, Search } from "lucide-react";

export type CharacterSort = "name" | "origin" | "favorite";
export type CharacterViewMode = "grid" | "list";

interface CharacterFiltersProps {
  total: number;
  origins: string[];
  query: string;
  origin: string;
  sort: CharacterSort;
  viewMode: CharacterViewMode;
  onQueryChange: (value: string) => void;
  onOriginChange: (value: string) => void;
  onSortChange: (value: CharacterSort) => void;
  onViewModeChange: (value: CharacterViewMode) => void;
  onAddWaifu: () => void;
  onReset: () => void;
}

export default function CharacterFilters({
  total,
  origins,
  query,
  origin,
  sort,
  viewMode,
  onQueryChange,
  onOriginChange,
  onSortChange,
  onViewModeChange,
  onAddWaifu,
  onReset,
}: CharacterFiltersProps) {
  return (
    <header className="list-header">
      <div className="list-header__title">
        <span className="eyebrow">
          <span aria-hidden="true" />
          {total} saved profiles
        </span>
        <h1>WaifuList</h1>
      </div>

      <div className="list-toolbar">
        <label className="field-shell field-shell--search">
          <span>Search</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Name or origin"
          />
        </label>

        <label className="field-shell">
          <span>Origin</span>
          <select
            value={origin}
            onChange={(event) => onOriginChange(event.target.value)}
          >
            <option value="all">All origins</option>
            {origins.map((originName) => (
              <option key={originName} value={originName}>
                {originName}
              </option>
            ))}
          </select>
        </label>

        <label className="field-shell">
          <span>Sort</span>
          <ArrowDownAZ aria-hidden="true" />
          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as CharacterSort)
            }
          >
            <option value="name">Name</option>
            <option value="origin">Origin</option>
            <option value="favorite">Favorites</option>
          </select>
        </label>

        <div className="segmented-control" aria-label="View mode">
          <button
            aria-pressed={viewMode === "grid"}
            className={viewMode === "grid" ? "is-active" : undefined}
            type="button"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid2X2 aria-hidden="true" />
            Grid
          </button>
          <button
            aria-pressed={viewMode === "list"}
            className={viewMode === "list" ? "is-active" : undefined}
            type="button"
            onClick={() => onViewModeChange("list")}
          >
            <List aria-hidden="true" />
            List
          </button>
        </div>

        <button className="btn btn--secondary" type="button" onClick={onReset}>
          Reset
        </button>
        <button className="btn btn--primary" type="button" onClick={onAddWaifu}>
          Add Waifu
        </button>
      </div>
    </header>
  );
}
