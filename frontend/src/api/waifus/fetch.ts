// import api from "../api";
// import Waifu, { CreateWaifuData, UpdateWaifuData } from "./model";

import waifusData from "../waifus.json";
import Waifu, { CreateWaifuData, UpdateWaifuData, WaifuData } from "./model";

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

export function updateWaifus(newWaifus: UpdateWaifuData | UpdateWaifuData[]) {

  const updatedWaifus = Array.isArray(newWaifus) ? newWaifus.forEach((newWaifu) => {
    waifus.map((currentWaifu) => {
      currentWaifu.id === newWaifu.id ? newWaifu : currentWaifu;
    })
  }) : waifus.map((currentWaifu) => {
    currentWaifu.id === newWaifus.id
  })

  localStorage.setItem("waifus", JSON.stringify(updatedWaifus));
  getWaifus();

  return updatedWaifus;
}

export function createWaifu(waifuData: CreateWaifuData) {
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

