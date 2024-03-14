import Joi from "joi";

export const CreateWaifuBodySchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number(),
  hairColor: Joi.string(),
  eyeColor: Joi.string(),
  height: Joi.number(),
  weight: Joi.number(),
  birthday: Joi.string(),
  origin: Joi.string(),
  originUrl: Joi.string().uri(),
  backgroundUrl: Joi.string().uri(),
  heroUrl: Joi.string().uri(),
});

export const CreateWaifusBodySchema = Joi.array().items(CreateWaifuBodySchema);

export const UpdateWaifuBodySchema = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  hairColor: Joi.string(),
  eyeColor: Joi.string(),
  height: Joi.number(),
  weight: Joi.number(),
  birthday: Joi.string(),
  origin: Joi.string(),
  originUrl: Joi.string().uri(),
  backgroundUrl: Joi.string().uri(),
  heroUrl: Joi.string().uri(),
});
