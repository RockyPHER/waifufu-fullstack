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
    console.log("<GetWaifus>: Checking waifus...")
    if (!storedWaifus) {
      throw new Error("Waifus not found")
    }
    const parsedWaifus = JSON.parse(storedWaifus);
    console.log("<GetWaifus>: Waifus found! Checking Waifus format...")
    if (!isWaifuDataFormat(parsedWaifus)) {
      throw new Error("Stored waifus is not in a the expected format")
    }
    console.log("<GetWaifus>: Stored waifus is a valid format. Returning waifus...")
    return parsedWaifus as WaifuData[];
  } catch (err) {
    console.error("<GetWaifus>:", err);
    // Return default data if there's an error
    console.log("<GetWaifus>: Reseting waifus...")
    localStorage.setItem("waifus", JSON.stringify(waifusData));
    return waifusData as WaifuData[];
  }
}

export function deleteWaifus(indices: number[]) {
  const storedWaifus = getWaifus();
  console.log("<DeleteWaifus>: Checking for invalid indices...")
  const invalidIndices = indices.filter(index => !storedWaifus.some(waifu => waifu.id === index));
  if (invalidIndices.length > 0) {
    throw new Error(`Invalid indices: ${invalidIndices.join(", ")}`);
  }
  console.log("<DeleteWaifus>: No invalid indices found. Deleting waifus...")
  const newWaifus = storedWaifus.filter((waifu) => !indices.includes(waifu.id));
  const deletedWaifus = storedWaifus.filter((waifu) => indices.includes(waifu.id));
  // Replace stored waifus array with new filtered waifus
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  console.log("<DeleteWaifus>: Waifus deleted = ", deletedWaifus)
  return deletedWaifus;
}

export function updateWaifus(waifusInput: any[]) {
  console.log("<UpdateWaifus>: Checking input...")
  if (!isWaifuDataFormat(waifusInput)) {
    throw new Error("Waifu is not in the expected format");
  }
  console.log("<UpdateWaifus>: Valid input! Comparing waifus...")
  const storedWaifus = getWaifus();
  const foundWaifus = storedWaifus.filter(waifu => waifusInput.find(waifuInput => waifuInput.id === waifu.id));
  if (foundWaifus.length !== waifusInput.length) {
    throw new Error("Waifu not found");
  }
  const waifusSummary = [...foundWaifus, ...waifusInput];
  console.log("<UpdateWaifus>: Waifus found =", waifusSummary)
  console.log("<UpdateWaifus>: Updating waifus...")
  const newWaifus = storedWaifus.map((waifu) => {
    const waifuInput = waifusInput.find(waifuInput => waifuInput.id === waifu.id)
    return !waifuInput ? waifu : waifuInput
  })
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  console.log("<UpdateWaifus>: Waifus updated!")
  return waifusSummary as WaifuData[];
}

export function createWaifus(waifuInput: any[]) {
  console.log("<CreateWaifu>: Checking waifu...")
  if (!isWaifuDataFormat(waifuInput)) {
    throw new Error("Waifu is not in the expected format");
  }
  console.log("<CreateWaifu>: No invalid data found! Adding waifu...")
  const storedWaifus = getWaifus();
  const newWaifus = storedWaifus.concat(waifuInput);
  localStorage.setItem("waifus", JSON.stringify(newWaifus));
  console.log("<CreateWaifu>: New waifu added!", newWaifus)
  return newWaifus;
}

export function resetWaifus() {
  localStorage.setItem("waifus", JSON.stringify(waifusData))
  const storedWaifus = localStorage.getItem("waifus")
  if (!storedWaifus) {
    throw new Error("Waifu not found");
  }
  return JSON.parse(storedWaifus);
}





