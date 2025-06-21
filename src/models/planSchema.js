const Joi = require('joi');

const planSchema = Joi.object({
  _id: Joi.number().required(),
  planType: Joi.string().required(),
  accessibles: Joi.array().items(Joi.number()).required()
});

const moduleSchema = Joi.object({
  _id: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  features: Joi.array().items(Joi.string()).optional()
});

module.exports = { planSchema, moduleSchema }; 