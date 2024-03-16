import waifusData from "../waifus.json";
import Waifu, { CreateWaifuData, UpdateWaifuData, WaifuData } from "./model";

export let waifus: Waifu[];

export function getWaifus() {
  const storedWaifus = localStorage.getItem("waifus");
  console.log("<fetch> Checking stored waifus...");

  if (storedWaifus) {
    waifus = JSON.parse(JSON.stringify(waifusData));
    localStorage.setItem("waifus", JSON.stringify(waifus));
    console.log("<fetch> LocalStorage waifus undefined -> Added waifus: ", waifus);
    return waifus;
  }
  else {
    waifus = JSON.parse(JSON.stringify(storedWaifus));
    console.log("<fetch> LocalStorage waifus found: ", waifus);
    return waifus;
  }
}

export function backupWaifus() {
  waifus = JSON.parse(JSON.stringify(waifusData));
  localStorage.setItem("waifus", JSON.stringify(waifus));
  console.log("Waifus Reseted: ", waifus);
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

