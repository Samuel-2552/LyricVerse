// src/controllers/tagController.js
const { getDb } = require('../db/mongoClient');

exports.getAllTags = async (req, res) => {
  try {
    const db = getDb();
    const { language_version } = req.body;
    const tags = await db.collection('tags').find({
      language_versions: { $in: [language_version] }
    }).toArray();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};
