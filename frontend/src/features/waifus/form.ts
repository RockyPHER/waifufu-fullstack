import type { WaifuData } from "../../api/waifus/model";

export const UNKNOWN_MONTH = "unknown";
export const UNKNOWN_DAY = "--";

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const DAYS_PER_MONTH: Record<string, number> = {
  [UNKNOWN_MONTH]: 0,
  january: 31,
  february: 29,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

export interface WaifuFormValues {
  name: string;
  description: string;
  age: string;
  birthdayMonth: string;
  birthdayDay: string;
  origin: string;
  originUrl: string;
  hairColor: string;
  eyeColor: string;
  height: string;
  weight: string;
  backgroundUrl: string;
  accentColor: string;
  focalPoint: string;
  zoom: string;
  overlayStrength: string;
}

export const EMPTY_WAIFU_FORM_VALUES: WaifuFormValues = {
  name: "",
  description: "",
  age: "",
  birthdayMonth: UNKNOWN_MONTH,
  birthdayDay: UNKNOWN_DAY,
  origin: "",
  originUrl: "",
  hairColor: "",
  eyeColor: "",
  height: "",
  weight: "",
  backgroundUrl: "",
  accentColor: "#39C5BB",
  focalPoint: "58% 38%",
  zoom: "1",
  overlayStrength: "0.55",
};

export function getInitialWaifuFormValues(waifu?: WaifuData): WaifuFormValues {
  if (!waifu) {
    return EMPTY_WAIFU_FORM_VALUES;
  }

  const [birthdayMonth = UNKNOWN_MONTH, birthdayDay = UNKNOWN_DAY] =
    waifu.birthday?.split("_") ?? [];

  return {
    name: waifu.name,
    description: waifu.description ?? "",
    age: waifu.age?.toString() ?? "",
    birthdayMonth: birthdayMonth.toLowerCase(),
    birthdayDay,
    origin: waifu.origin ?? "",
    originUrl: waifu.originUrl ?? "",
    hairColor: waifu.hairColor ?? "",
    eyeColor: waifu.eyeColor ?? "",
    height: waifu.height?.toString() ?? "",
    weight: waifu.weight?.toString() ?? "",
    backgroundUrl: waifu.backgroundUrl ?? "",
    accentColor:
      waifu.visual?.accentColor ?? EMPTY_WAIFU_FORM_VALUES.accentColor,
    focalPoint: waifu.visual?.focalPoint ?? EMPTY_WAIFU_FORM_VALUES.focalPoint,
    zoom: waifu.visual?.zoom?.toString() ?? EMPTY_WAIFU_FORM_VALUES.zoom,
    overlayStrength:
      waifu.visual?.overlayStrength?.toString() ??
      EMPTY_WAIFU_FORM_VALUES.overlayStrength,
  };
}

export function getAvailableDays(month: string) {
  return DAYS_PER_MONTH[month] ?? 0;
}

export function getNextWaifuId(waifus: WaifuData[]) {
  return (
    waifus.reduce((highestId, waifu) => Math.max(highestId, waifu.id), 0) + 1
  );
}

export function buildWaifuPayload(
  formValues: WaifuFormValues,
  options: {
    id: number;
    favorite?: boolean;
  },
): WaifuData {
  const visual = {
    accentColor:
      parseOptionalString(formValues.accentColor) ??
      EMPTY_WAIFU_FORM_VALUES.accentColor,
    focalPoint:
      parseOptionalString(formValues.focalPoint) ??
      EMPTY_WAIFU_FORM_VALUES.focalPoint,
    zoom: parseOptionalNumber(formValues.zoom) ?? 1,
    overlayStrength: parseOptionalNumber(formValues.overlayStrength) ?? 0.55,
  };

  return {
    id: options.id,
    name: formValues.name.trim(),
    description: parseOptionalString(formValues.description),
    favorite: options.favorite,
    age: parseOptionalNumber(formValues.age),
    birthday: buildBirthday(formValues.birthdayMonth, formValues.birthdayDay),
    origin: parseOptionalString(formValues.origin),
    originUrl: parseOptionalString(formValues.originUrl),
    hairColor: parseOptionalString(formValues.hairColor),
    eyeColor: parseOptionalString(formValues.eyeColor),
    height: parseOptionalNumber(formValues.height),
    weight: parseOptionalNumber(formValues.weight),
    backgroundUrl: parseOptionalString(formValues.backgroundUrl),
    visual,
  };
}

export function formatBirthdayLabel(birthday?: string) {
  if (!birthday || birthday === `${UNKNOWN_MONTH}_${UNKNOWN_DAY}`) {
    return UNKNOWN_MONTH;
  }

  const [month, day] = birthday.split("_");
  return `${month} ${day}`;
}

function buildBirthday(month: string, day: string) {
  if (month === UNKNOWN_MONTH || day === UNKNOWN_DAY) {
    return `${UNKNOWN_MONTH}_${UNKNOWN_DAY}`;
  }

  return `${capitalize(month)}_${day}`;
}

function parseOptionalNumber(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);
  return Number.isNaN(parsedValue) ? undefined : parsedValue;
}

function parseOptionalString(value: string) {
  const normalizedValue = value.trim();
  return normalizedValue ? normalizedValue : undefined;
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
