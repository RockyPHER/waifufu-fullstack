import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().required().min(1).max(30),
  age: Joi.number().min(0),
  background_url: Joi.string().required(),
  hero_url: Joi.string(),
  hair_color: Joi.string(),
  eye_color: Joi.string(),
  height: Joi.number().min(0),
  weight: Joi.number().min(0),
  origin: Joi.string().required(),
  origin_url: Joi.string(),
  birthday: Joi.string().regex(/\b\w{3,9}_([1-9]|[12]\d|3[01])\b/si),
});

//
