const Joi = require('joi');

const songSchema = Joi.object({
  title: Joi.string().required(),
  alt_title: Joi.string().optional(),
  language: Joi.string().required(),
  author: Joi.string().required(),
  link: Joi.string().uri().optional(),
  genre: Joi.string().optional(),
  draft: Joi.boolean().default(true),
  staff_user_id: Joi.number().required(),
  scale_id: Joi.number().optional(),
  tag_id: Joi.number().optional()
});

module.exports = songSchema;