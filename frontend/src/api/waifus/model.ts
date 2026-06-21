export interface WaifuData {
  id: number;
  name: string;
  description?: string;
  favorite?: boolean;
  age?: number;
  backgroundUrl?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  birthday?: string;
  origin?: string;
  originUrl?: string;
  visual?: WaifuVisual;
}

export type CreateWaifuData = WaifuData;

export type UpdateWaifuData = WaifuData;

export interface WaifuVisual {
  accentColor?: string;
  focalPoint?: string;
  zoom?: number;
  overlayStrength?: number;
}
