import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(1).max(30),
  age: Joi.number().min(0).optional(),
  backgroundUrl: Joi.string().optional().allow(null),
  heroUrl: Joi.string().optional().allow(null),
  hairColor: Joi.string().optional().allow(null),
  eyeColor: Joi.string().optional().allow(null),
  height: Joi.number().min(0).optional(),
  weight: Joi.number().min(0).optional(),
  origin: Joi.string().optional().allow(null),
  originUrl: Joi.string().optional().allow(null),
  birthday: Joi.string().regex(/unknown_--|\b\w{3,9}_([1-9]|[12]\d|3[01])\b/si).optional(),
});

//
