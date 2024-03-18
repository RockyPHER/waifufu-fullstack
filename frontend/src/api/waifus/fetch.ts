import waifusData from "../waifus.json";
import { WaifuData } from "./model";

export function getWaifus() {
  try {
    const storedWaifus = localStorage.getItem("waifus");
    if (!storedWaifus) {
      throw new Error("Waifus not found")
    }
    const parsedWaifus = JSON.parse(storedWaifus);
    if (!Array.isArray(parsedWaifus)) {
      throw new Error("Stored waifus is not in a the expected format")
    }
    return parsedWaifus as WaifuData[];
  } catch (err) {
    console.error(err);
    localStorage.setItem("waifus", JSON.stringify(waifusData));
    return waifusData as WaifuData[];
  }
}




