import {
  CalendarFold,
  Eye,
  Globe2,
  Hourglass,
  Palette,
  Ruler,
  Weight,
  type LucideIcon,
} from "lucide-react";
import type { WaifuData } from "../../api/waifus/model";
import { formatBirthdayLabel } from "../../features/waifus/form";

interface CharacterInfoProps {
  waifu: WaifuData;
}

type DetailKey =
  | "age"
  | "origin"
  | "height"
  | "weight"
  | "birthday"
  | "hairColor"
  | "eyeColor";

const detailItems: Array<{
  key: DetailKey;
  label: string;
  Icon: LucideIcon;
  unit?: string;
}> = [
  { key: "age", label: "Age", Icon: Hourglass, unit: "years" },
  { key: "origin", label: "Origin", Icon: Globe2 },
  { key: "height", label: "Height", Icon: Ruler, unit: "cm" },
  { key: "weight", label: "Weight", Icon: Weight, unit: "kg" },
  { key: "birthday", label: "Birthday", Icon: CalendarFold },
  { key: "hairColor", label: "Hair", Icon: Palette },
  { key: "eyeColor", label: "Eyes", Icon: Eye },
];

export default function CharacterInfo({ waifu }: CharacterInfoProps) {
  const visibleDetails = detailItems
    .map((item) => {
      const value =
        item.key === "birthday"
          ? formatBirthdayLabel(waifu.birthday)
          : waifu[item.key];

      return {
        ...item,
        value,
      };
    })
    .filter((item) => item.value !== undefined && item.value !== "");

  return (
    <dl className="character-info">
      {visibleDetails.map(({ key, label, Icon, unit, value }) => (
        <div className="character-info__row" key={key}>
          <dt>
            <Icon aria-hidden="true" />
            {label}
          </dt>
          <dd>
            {key === "origin" && waifu.originUrl ? (
              <a href={waifu.originUrl} target="_blank" rel="noreferrer">
                {value}
              </a>
            ) : (
              value
            )}
            {unit ? ` ${unit}` : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
