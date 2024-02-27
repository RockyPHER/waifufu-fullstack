// import api from "../api";
// import Waifu, { CreateWaifuData, UpdateWaifuData } from "./model";

import waifusData from "../waifus.json";
import Waifu from "./model";

// export async function getWaifus() {
//   return await api.get<Waifu[]>("/waifus");
// }

// export async function createWaifu(data: CreateWaifuData) {
//   return await api.post<Waifu>("/waifus", data);
// }

// export async function updateWaifu(data: UpdateWaifuData) {
//   return await api.put<Waifu>("/waifus", data);
// }

export function getWaifus() {
  const waifus: Waifu[] = JSON.parse(JSON.stringify(waifusData));
  return waifus;
}
