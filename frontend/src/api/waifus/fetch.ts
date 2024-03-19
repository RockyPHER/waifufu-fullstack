import Joi from "joi";
import waifusData from "../waifus.json";
import { WaifuData } from "./model";
import { schema } from "./schema";

function isWaifuDataFormat(data: any[]) {
  // Joi dev validation
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
    // Return default data if there's an error
    localStorage.setItem("waifus", JSON.stringify(waifusData));
    return waifusData as WaifuData[];
  }
}

export function deleteWaifus(indices: number[]) {
  try {
    const storedWaifus = getWaifus();
    const invalidIndices = indices.filter(index => !storedWaifus.some(waifu => waifu.id === index));
    if (invalidIndices.length > 0) {
      throw new Error(`Invalid indices: ${invalidIndices.join(", ")}`);
    }
    const newWaifus = storedWaifus.filter((waifu) => !indices.includes(waifu.id));
    const deletedWaifus = storedWaifus.filter((waifu) => indices.includes(waifu.id));
    // Replace stored waifus array with new filtered waifus
    localStorage.setItem("waifus", JSON.stringify(newWaifus));
    return deletedWaifus;
  } catch (err) {
    console.error(err);
  }
}

export function updateWaifus(waifusInput: WaifuData[]) {
  try {
    if (!isWaifuDataFormat(waifusInput)) {
      throw new Error("Data is not in the expected format");
    }
    const storedWaifus = getWaifus();
    const foundWaifus = storedWaifus.filter(waifu => waifusInput.find(waifuInput => waifuInput.id === waifu.id));
    if (foundWaifus.length !== waifusInput.length) {
      throw new Error("Waifu not found");
    }
    const waifusSummary = [...foundWaifus, ...waifusInput];
    const newWaifus = storedWaifus.map((waifu) => {
      const waifuInput = waifusInput.find(waifuInput => waifuInput.id === waifu.id)
      return !waifuInput ? waifu : waifuInput
    })
    localStorage.setItem("waifus", JSON.stringify(newWaifus));
    return waifusSummary as WaifuData[];
  } catch (err) {
    console.error(err);
    return err
  }
}






