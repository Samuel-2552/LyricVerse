const { getDb } = require('../db/mongoClient');

exports.getAllGenres = async (req, res) => {
  try {
    const db = getDb();
    const genres = await db.collection('genres').find({}).toArray();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};