const { getDb } = require('../db/mongoClient');

exports.getAllScales = async (req, res) => {
  try {
    const db = getDb();
    const scales = await db.collection('scales').find({}).toArray();
    res.json(scales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scales' });
  }
};