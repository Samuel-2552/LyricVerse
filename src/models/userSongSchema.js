const Joi = require('joi');

const userSongSchema = Joi.object({
  title: Joi.string().required(),
  alt_title: Joi.string().optional(),
  language: Joi.string().required(),
  author: Joi.string().required(),
  link: Joi.string().uri().optional(),
  genre: Joi.string().optional(),
  version_id: Joi.number().optional(),
  edited_at: Joi.string().optional(), // Will be auto-generated
  scale_id: Joi.number().optional(),
  song_id: Joi.number().optional(), // Reference to master song (if based on one)
  user_id: Joi.number().required(),
  tag_id: Joi.number().optional()
});

module.exports = userSongSchema;