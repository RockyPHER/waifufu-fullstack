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
var waifus: Waifu[];
export function backupWaifus() {
  waifus = JSON.parse(JSON.stringify(waifusData));
  localStorage.setItem("waifus", JSON.stringify(waifus));
  return waifus;
}

export function getWaifus() {
  waifus = localStorage.getItem("waifus")
    ? JSON.parse(localStorage.getItem("waifus")!)
    : JSON.parse(JSON.stringify(waifusData));
  return waifus;
}

export function updateWaifus(waifuList: Waifu[]) {
  const newWaifus = waifuList;
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  getWaifus();
}
