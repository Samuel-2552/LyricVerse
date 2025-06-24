// config/mongoClient.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'lyricverse';

let client;
let db;

async function connectToMongo() {
  if (db) return db; // Reuse connection if already established
  client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB database:', db.databaseName);
  return db;
}

function getDb() {
  if (!db) throw new Error('MongoDB not connected!');
  return db;
}

module.exports = { connectToMongo, getDb };