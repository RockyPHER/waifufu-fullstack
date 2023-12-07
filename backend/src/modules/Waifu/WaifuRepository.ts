import { CreateWaifuInput, Waifu } from "./WaifuModel"

const waifuList: Waifu[] = []

export async function getWaifuRepository(id: number) {
    const waifu = waifuList.find(waifu => waifu.id === id)
    if (!waifu) {
        throw new Error("WaifuNotFound")
    }
    return waifu
}

export async function getWaifusRepository() {
    return waifuList
}

export async function createWaifuRepository(data: CreateWaifuInput) {
    const waifu: Waifu = {
        id: waifuList.length + 1,
        ...data
    }
    waifuList.push(waifu)
    return waifu
}

export async function deleteWaifuRepository(id: number) {
    const waifu = waifuList.find(waifu => waifu.id === id)
    if (!waifu) {
        throw new Error("WaifuNotFound")
    }
    waifuList.splice(waifuList.indexOf(waifu), 1)
    return waifu
}