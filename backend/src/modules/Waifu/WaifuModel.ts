export interface Waifu {
  id: number;
  name: string;
  age: number;
  haircolor?: string;
  eyecolor?: string;
  height?: number;
  weight?: number;
  birthday?: string;
  origin?: string;
  backgroundUrl?: string;
  heroUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWaifuInput {
  name: string;
  age: number;
  haircolor?: string;
  eyecolor?: string;
  height?: number;
  weight?: number;
  birthday?: string;
  origin?: string;
  backgroundUrl?: string;
  heroUrl?: string;
}

export interface UpdateWaifuInput {
  name?: string;
  age?: number;
  haircolor?: string;
  eyecolor?: string;
  height?: number;
  weight?: number;
  birthday?: string;
  origin?: string;
  backgroundUrl?: string;
  heroUrl?: string;
}
