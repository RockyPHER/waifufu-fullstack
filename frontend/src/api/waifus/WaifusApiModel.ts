export default interface Waifu {
  id: number;
  name: string;
  age: number;
  imageUrl: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  birthday?: Date;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WaifuData {
  name: string;
  age: number;
  imageUrl: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  birthday?: Date;
  bio?: string;
}

export type CreateWaifuData = WaifuData;

export type UpdateWaifuData = WaifuData;
