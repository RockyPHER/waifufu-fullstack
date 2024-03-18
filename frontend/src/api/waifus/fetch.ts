import Joi from "joi";
import waifusData from "../waifus.json";
import { WaifuData } from "./model";
import { schema } from "./schema";

function isWaifuDataFormat(data: any[]) {
  const waifuSchema = Joi.array().items(schema);
  const { error } = waifuSchema.validate(data);
  return !error;
}
export function getWaifus() {
  try {
    const storedWaifus = localStorage.getItem("waifus");
    if (!storedWaifus) {
      throw new Error("Waifus not found")
    }
    const parsedWaifus = JSON.parse(storedWaifus);
    if (!isWaifuDataFormat(parsedWaifus)) {
      throw new Error("Stored waifus is not in a the expected format")
    }
    return parsedWaifus as WaifuData[];
  } catch (err) {
    console.error(err);
    localStorage.setItem("waifus", JSON.stringify(waifusData));
    return waifusData as WaifuData[];
  }
}

export function deleteWaifus(index: number[]) {
  const storedWaifus = getWaifus();
  const updatedWaifus = storedWaifus.filter((waifu) => !index.includes(waifu.id));
  localStorage.setItem("waifus", JSON.stringify(updatedWaifus));
  return updatedWaifus;
}




