import { CreateWaifuInput, UpdateWaifuInput, Waifu } from "./WaifuModel";
import {
  createWaifuRepository,
  deleteWaifuRepository,
  getWaifuRepository,
  getWaifusRepository,
  updateWaifurepository,
} from "./WaifuRepository";

export async function getWaifuService(id: number) {
  return await getWaifuRepository(id);
}

export async function getWaifusService() {
  return await getWaifusRepository();
}

export async function createWaifuService(input: CreateWaifuInput) {
  return await createWaifuRepository(input);
}

export async function deleteWaifuService(id: number) {
  return await deleteWaifuRepository(id);
}

export async function updateWaifuService(id: number, input: UpdateWaifuInput) {
  return await updateWaifurepository(id, input);
}
