import express from "express";
import {
  createWaifu,
  createWaifus,
  deleteWaifu,
  getWaifu,
  getWaifus,
  updateWaifu,
} from "./modules/Waifu/WaifuController";

const router = express.Router();

router.get("/waifus/:id", getWaifu);
router.get("/waifus", getWaifus);
router.post("/waifus", createWaifu);
router.post("/waifus/many", createWaifus);
router.delete("/waifus/:id", deleteWaifu);
router.patch("/waifus/:id", updateWaifu);

export default router;
