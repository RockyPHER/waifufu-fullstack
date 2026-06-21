import waifusData from "../waifus.json";
import type { WaifuData } from "./model";
import { waifuCollectionSchema } from "./schema";

const WAIFUS_STORAGE_KEY = "waifus";
const defaultWaifus = waifusData as WaifuData[];

function isWaifuDataFormat(data: unknown): data is WaifuData[] {
  const { error } = waifuCollectionSchema.validate(data, {
    abortEarly: false,
    convert: false,
  });

  return !error;
}

export function getWaifus() {
  const storedWaifus = localStorage.getItem(WAIFUS_STORAGE_KEY);

  if (!storedWaifus) {
    return resetWaifus();
  }

  try {
    const parsedWaifus: unknown = JSON.parse(storedWaifus);

    if (!isWaifuDataFormat(parsedWaifus)) {
      throw new Error("Stored waifus are not in the expected format");
    }

    return parsedWaifus;
  } catch {
    return resetWaifus();
  }
}

export function deleteWaifus(ids: number[]) {
  const storedWaifus = getWaifus();
  const invalidIds = ids.filter(
    (id) => !storedWaifus.some((waifu) => waifu.id === id),
  );

  if (invalidIds.length > 0) {
    throw new Error(`Invalid indices: ${invalidIds.join(", ")}`);
  }

  const idSet = new Set(ids);
  const deletedWaifus = storedWaifus.filter((waifu) => idSet.has(waifu.id));
  const nextWaifus = storedWaifus.filter((waifu) => !idSet.has(waifu.id));

  saveWaifus(nextWaifus);
  return deletedWaifus;
}

export function updateWaifus(waifusInput: WaifuData[]) {
  validateWaifuCollection(waifusInput);

  const storedWaifus = getWaifus();
  const updatesById = new Map(
    waifusInput.map((waifuInput) => [waifuInput.id, waifuInput]),
  );
  const foundWaifus = storedWaifus.filter((waifu) => updatesById.has(waifu.id));

  if (foundWaifus.length !== waifusInput.length) {
    throw new Error("Waifu not found");
  }

  const nextWaifus = storedWaifus.map(
    (waifu) => updatesById.get(waifu.id) ?? waifu,
  );

  saveWaifus(nextWaifus);
  return [...foundWaifus, ...waifusInput];
}

export function createWaifus(waifuInput: WaifuData[]) {
  validateWaifuCollection(waifuInput);

  const storedWaifus = getWaifus();
  const nextWaifus = storedWaifus.concat(waifuInput);

  saveWaifus(nextWaifus);
  return nextWaifus;
}

export function resetWaifus() {
  return saveWaifus(defaultWaifus.map((waifu) => ({ ...waifu })));
}

function validateWaifuCollection(waifus: WaifuData[]) {
  if (!isWaifuDataFormat(waifus)) {
    throw new Error("Waifu is not in the expected format");
  }
}

function saveWaifus(waifus: WaifuData[]) {
  localStorage.setItem(WAIFUS_STORAGE_KEY, JSON.stringify(waifus));
  return waifus;
}
