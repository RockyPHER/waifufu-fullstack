import Joi from "joi";

export const CreateWaifuBodySchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    haircolor: Joi.string(),
    eyecolor: Joi.string(),
    height: Joi.number(),
    weight: Joi.number(),
    birthday: Joi.date(),
    bio: Joi.string()
})