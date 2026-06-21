import type { WaifuData, WaifuVisual } from "../../api/waifus/model";
import type { CSSProperties } from "react";

export interface ResolvedWaifuVisual {
  accentColor: string;
  focalPoint: string;
  zoom: number;
  overlayStrength: number;
}

export const DEFAULT_WAIFU_VISUAL: ResolvedWaifuVisual = {
  accentColor: "#39C5BB",
  focalPoint: "58% 38%",
  zoom: 1,
  overlayStrength: 0.55,
};

const FALLBACK_ACCENTS = [
  "#39C5BB",
  "#F472B6",
  "#93C5FD",
  "#FBBF24",
  "#FB7185",
  "#EF6464",
];

export function getWaifuVisual(waifu?: WaifuData): ResolvedWaifuVisual {
  const accentColor =
    waifu?.visual?.accentColor ??
    FALLBACK_ACCENTS[Math.abs((waifu?.id ?? 0) - 1) % FALLBACK_ACCENTS.length];

  return {
    accentColor,
    focalPoint: normalizeVisualValue(
      waifu?.visual?.focalPoint,
      DEFAULT_WAIFU_VISUAL.focalPoint,
    ),
    zoom: clampVisualNumber(
      waifu?.visual?.zoom,
      DEFAULT_WAIFU_VISUAL.zoom,
      0.8,
      1.8,
    ),
    overlayStrength: clampVisualNumber(
      waifu?.visual?.overlayStrength,
      DEFAULT_WAIFU_VISUAL.overlayStrength,
      0.25,
      0.85,
    ),
  };
}

export function getWaifuVisualStyle(waifu?: WaifuData) {
  const visual = getWaifuVisual(waifu);

  return {
    "--character-accent": visual.accentColor,
    "--character-focal-point": visual.focalPoint,
    "--character-zoom": visual.zoom,
    "--character-overlay-strength": visual.overlayStrength,
  } as CSSProperties;
}

export function mergeWaifuVisual(
  formVisual: Required<WaifuVisual>,
): Required<WaifuVisual> {
  return {
    accentColor: formVisual.accentColor,
    focalPoint: formVisual.focalPoint,
    zoom: clampVisualNumber(
      formVisual.zoom,
      DEFAULT_WAIFU_VISUAL.zoom,
      0.8,
      1.8,
    ),
    overlayStrength: clampVisualNumber(
      formVisual.overlayStrength,
      DEFAULT_WAIFU_VISUAL.overlayStrength,
      0.25,
      0.85,
    ),
  };
}

function normalizeVisualValue(value: string | undefined, fallback: string) {
  return value?.trim() ? value : fallback;
}

function clampVisualNumber(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}
