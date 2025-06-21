import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import authRoutes from './routes/auth.js';  
import userRoutes from './routes/user.js';
import workspaceRoutes from './routes/workspace.js';
import scheduledCleanup from './services/cleanupService.js';

dotenv.config({ path: './.env' });

const app = express();

// Start scheduled jobs
scheduledCleanup();

// Connect to Database
connectDB();

// Init Middleware

// More robust CORS configuration to handle preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dev.oilnwine.tech'); // only this domain allowed
  res.header('Access-Control-Allow-Credentials', 'true'); // allow cookies/token headers if needed
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // all methods
      return res.status(200).json({});
  }

  next();
});


app.use(cors()); // Keep cors for simplicity on non-preflight requests
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workspaces', workspaceRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});