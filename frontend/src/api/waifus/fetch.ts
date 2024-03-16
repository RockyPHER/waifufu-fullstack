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
export let waifus: Waifu[] = JSON.parse(JSON.stringify(waifusData));

console.log("waifus :" + waifus)

export function backupWaifus() {
  waifus = JSON.parse(JSON.stringify(waifusData));
  localStorage.setItem("waifus", JSON.stringify(waifus));
  return waifus;
}

export function getWaifus() {
  const storedWaifus = localStorage.getItem("waifus");
  if (storedWaifus === undefined) {
    waifus = JSON.parse(storedWaifus)
  } else {
    waifus = JSON.parse(JSON.stringify(waifusData));
    localStorage.setItem("waifus", JSON.stringify(waifus));
  }
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

export function deleteWaifus(deleteWaifus: WaifuData | WaifuData[]) {

  const deletedWaifus = Array.isArray(deleteWaifus) ? deleteWaifus.forEach((deleteWaifu) => {
    waifus.filter((waifu) => {
      deleteWaifu.id !== waifu.id
    })
  }) : waifus.filter((waifu) => {
    deleteWaifus.id !== waifu.id
  })

  localStorage.setItem("waifus", JSON.stringify(deletedWaifus));
  getWaifus();

  return deletedWaifus;
}

export function createWaifu(waifuData: CreateWaifuData) {
  getWaifus();
  const newWaifu = {
    ...waifuData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newWaifus = [...waifus, newWaifu]
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  return newWaifu;
}

