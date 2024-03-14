// import api from "../api";
// import Waifu, { CreateWaifuData, UpdateWaifuData } from "./model";

import waifusData from "../waifus.json";
import Waifu, { WaifuData } from "./model";

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

export function updateWaifus(waifusList: Waifu[]) {
  const newWaifus = waifusList;
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  getWaifus();
  return newWaifus;
}

export function createWaifu(waifuData: WaifuData) {
  getWaifus();
  const newWaifu = {
    ...waifuData,
    id: Math.floor(Math.random() * 1000000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newWaifus = [...waifus, newWaifu]
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  return newWaifu;
}

