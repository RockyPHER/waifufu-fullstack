import express from "express";
import { createWaifu, deleteWaifu, getWaifu, getWaifus } from "./modules/Waifu/WaifuController";

const router = express.Router();


router.get("/waifus/:id", getWaifu)
router.get("/waifus", getWaifus)
router.post("/waifus", createWaifu)
router.delete("/waifus/:id", deleteWaifu)

export default router;