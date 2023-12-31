import { Request, Response } from "express";
import { createWaifuService, deleteWaifuService, getWaifuService, getWaifusService } from "./WaifuService";
import { CreateWaifuBodySchema } from "./WaifuSchema";

export async function getWaifu(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
        const waifu = await getWaifuService(id)

        if (waifu == null) {
            throw new Error("WaifuNotFound")
        }

        res.status(200).json(waifu);
    }
    catch (err: any) {
        if (err.message == "WaifuNotFound") return res.status(404).json({ error: "Waifu não foi encontrada" })
        res.status(500).json(err)
    }
}

export async function getWaifus(req: Request, res: Response) {
    try {
        const waifus = await getWaifusService()
        res.status(200).json(waifus)
    }
    catch (err: any) {
        res.status(500).json(err)
    }
}

export async function createWaifu(req: Request, res: Response) {
    try {
        const input = await CreateWaifuBodySchema.validateAsync(req.body)
        const waifu = await createWaifuService(input)
        res.status(201).json(waifu);
    }
    catch (err: any) {
        res.status(500).json(err)
    }
}

export async function deleteWaifu(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
        const waifu = await deleteWaifuService(id)
        res.status(200).json(waifu);
    }
    catch (err: any) {
        if (err.message == "WaifuNotFound") return res.status(404).json({ error: "Waifu não foi encontrada" })
        res.status(500).json(err)
    }
}