export default interface Waifu {
  [key: string]: any;
  id: number;
  name: string;
  age?: number;
  backgroundUrl?: string;
  heroUrl?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  origin?: string;
  originUrl?: string;
  birthday?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WaifuData {
  name: string;
  age?: number;
  backgroundUrl?: string;
  heroUrl?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  birthday?: string;
  origin?: string;
  originUrl?: string;
}

export type CreateWaifuData = WaifuData;

export type UpdateWaifuData = WaifuData;
