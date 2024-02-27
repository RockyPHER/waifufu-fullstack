import prisma from "../../services/prisma";
import { CreateWaifuInput, UpdateWaifuInput, Waifu } from "./WaifuModel";

export async function getWaifuRepository(id: number) {
  return await prisma.waifu.findUnique({
    where: {
      id,
    },
  });
}

export async function getWaifusRepository() {
  return await prisma.waifu.findMany();
}

export async function createWaifuRepository(data: CreateWaifuInput) {
  return await prisma.waifu.create({
    data,
  });
}

export async function deleteWaifuRepository(id: number) {
  return await prisma.waifu.delete({
    where: {
      id,
    },
  });
}

export async function updateWaifurepository(
  id: number,
  input: UpdateWaifuInput
) {
  return await prisma.waifu.update({
    where: {
      id,
    },
    data: input,
  });
}
