import { Request, Response } from "express";
import {
  createWaifuService,
  deleteWaifuService,
  getWaifuService,
  getWaifusService,
  updateWaifuService,
} from "./WaifuService";
import {
  CreateWaifuBodySchema,
  CreateWaifusBodySchema,
  UpdateWaifuBodySchema,
} from "./WaifuSchema";

export async function getWaifu(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const waifu = await getWaifuService(id);

    if (waifu == null) {
      throw new Error("WaifuNotFound");
    }

    res.status(200).json(waifu);
  } catch (err: any) {
    if (err.message == "WaifuNotFound")
      return res.status(404).json({ error: "Waifu não foi encontrada" });
    res.status(500).json(err);
  }
}

export async function getWaifus(req: Request, res: Response) {
  try {
    const waifus = await getWaifusService();
    res.status(200).json(waifus);
  } catch (err: any) {
    res.status(500).json(err);
  }
}

export async function createWaifu(req: Request, res: Response) {
  try {
    const input = await CreateWaifuBodySchema.validateAsync(req.body);
    const waifu = await createWaifuService(input);
    res.status(201).json(waifu);
  } catch (err: any) {
    res.status(500).json(err);
  }
}
export async function createWaifus(req: Request, res: Response) {
  try {
    const inputs = await req.body;

    const validateInputs = await Promise.all(
      inputs.map(async (input, index) => {
        try {
          await CreateWaifuBodySchema.validateAsync(input);
          return input;
        } catch (err: any) {
          return { index, error: err.message };
        }
      })
    );

    const validateErrors = validateInputs.filter((item) =>
      item.hasOwnProperty("error")
    );

    const okInputs = validateInputs.filter(
      (item) => !item.hasOwnProperty("error")
    );

    const waifus = await Promise.all(
      okInputs.map(async (input) => {
        return await createWaifuService(input);
      })
    );

    if (validateErrors.length > 0) {
      return res.status(400).json({ errors: validateErrors });
    }

    res.status(201).json(waifus);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteWaifu(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const waifu = await deleteWaifuService(id);
    res.status(200).json(waifu);
  } catch (err: any) {
    if (err.message == "WaifuNotFound")
      return res.status(404).json({ error: "Waifu não foi encontrada" });
    res.status(500).json(err);
  }
}

export async function updateWaifu(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const input = await UpdateWaifuBodySchema.validateAsync(req.body);
    const waifu = await updateWaifuService(id, input);
    res.status(200).json(waifu);
  } catch (err: any) {
    if (err.message == "WaifuNotFound")
      return res.status(404).json({ error: "Waifu não foi encontrada" });
    res.status(500).json(err);
  }
}
