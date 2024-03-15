import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(1).max(30),
  age: Joi.number().min(0),
  backgroundUrl: Joi.string(),
  heroUrl: Joi.string(),
  hairColor: Joi.string(),
  eyeColor: Joi.string(),
  height: Joi.number().min(0),
  weight: Joi.number().min(0),
  origin: Joi.string(),
  originUrl: Joi.string(),
  birthday: Joi.string().regex(/unknown_--|\b\w{3,9}_([1-9]|[12]\d|3[01])\b/si),
});

//
