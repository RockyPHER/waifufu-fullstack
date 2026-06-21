import Joi from "joi";
import type { WaifuData } from "./model";

const optionalUrl = Joi.string()
  .uri({ scheme: ["http", "https"] })
  .optional();

const optionalImageSource = Joi.alternatives()
  .try(
    optionalUrl,
    Joi.string()
      .trim()
      .pattern(/^\/.+\.(?:avif|gif|jpe?g|png|svg|webp)$/i),
  )
  .optional();

export const schema = Joi.object<WaifuData>({
  id: Joi.number().required(),
  name: Joi.string().trim().required().min(1).max(30),
  description: Joi.string().trim().optional().allow(null, "").max(180),
  favorite: Joi.boolean().optional(),
  age: Joi.number().min(0).optional(),
  backgroundUrl: optionalImageSource.allow(null, ""),
  hairColor: Joi.string().optional().allow(null, ""),
  eyeColor: Joi.string().optional().allow(null, ""),
  height: Joi.number().min(0).optional(),
  weight: Joi.number().min(0).optional(),
  origin: Joi.string().optional().allow(null, ""),
  originUrl: optionalUrl.allow(null, ""),
  birthday: Joi.string()
    .pattern(/^(unknown_--|[A-Z][a-z]{2,8}_([1-9]|[12]\d|3[01]))$/)
    .optional(),
  visual: Joi.object({
    accentColor: Joi.string()
      .pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
      .optional()
      .allow(null, ""),
    focalPoint: Joi.string().trim().optional().allow(null, ""),
    zoom: Joi.number().min(0.8).max(1.8).optional(),
    overlayStrength: Joi.number().min(0.25).max(0.85).optional(),
  }).optional(),
});

export const waifuCollectionSchema = Joi.array().items(schema).required();
