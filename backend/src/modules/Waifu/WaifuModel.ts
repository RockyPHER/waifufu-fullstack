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
  imageUrl?: string;
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
  imageUrl?: string;
}
