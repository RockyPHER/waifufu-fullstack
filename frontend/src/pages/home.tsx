import type { WaifuData } from "../api/waifus/model";
import CharacterHero from "../components/characters/CharacterHero";

interface HomeProps {
  waifus: WaifuData[];
  activeWaifu?: WaifuData;
  onPrevious: () => void;
  onNext: () => void;
  onSelectWaifu: (waifu: WaifuData) => void;
  onAddWaifu: () => void;
  onEditWaifu: (waifu: WaifuData) => void;
  onDeleteWaifu: (waifu: WaifuData) => void;
  onToggleFavorite: (waifu: WaifuData) => void;
}

export default function Home({
  onSelectWaifu,
  ...characterHeroProps
}: HomeProps) {
  return <CharacterHero {...characterHeroProps} onSelect={onSelectWaifu} />;
}
