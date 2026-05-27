require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const seedArticles = require('./config/seedArticles');
const userRoutes = require('./routes/useRoutes'); // Make sure your filename casing matches perfectly!
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 8000;
let dbReady;

app.use(cors());
app.use(express.json());

// 1. Database connection preparation function
const prepareDatabase = async () => {
  if (!dbReady) {
    dbReady = (async () => {
      await connectDB();
      // Only seed data if your local files exist and are required for deployment initialization
      if (typeof seedAdmin === 'function') await seedAdmin();
      if (typeof seedArticles === 'function') await seedArticles();
    })();
  }
  return dbReady;
};

// 2. Global Middleware: Initialize database connection across ALL entry routes safely
app.use(async (req, res, next) => {
  try {
    await prepareDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: `Database Initialization Error: ${error.message}` });
  }
});

// 3. API Sub-routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// 4. Default Base Route (If matching your professor's local setup, remove or adjust this)
// If your professor's recording specifically requires "Cannot GET /", comment out or delete the app.get('/') below!
app.get('/', (_req, res) => {
  res.send('Manuel server is running');
});

// 5. Local development execution fallback
const startServer = async () => {
  try {
    await prepareDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to spin up local development server:', err);
  }
};

if (require.main === module) {
  startServer();
}

// Export serverless handlers for Vercel deployment infrastructure
const handler = (req, res) => app(req, res);
module.exports = handler;
module.exports.default = handler;
