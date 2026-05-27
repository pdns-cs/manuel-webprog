require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const seedArticles = require('./config/seedArticles');
const userRoutes = require('./routes/useRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 8000;
let dbReady;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Manuel server is running');
});

const prepareDatabase = async () => {
  if (!dbReady) {
    dbReady = (async () => {
      await connectDB();
      await seedAdmin();
      await seedArticles();
    })();
  }

  return dbReady;
};

const requireDatabase = async (_req, res, next) => {
  try {
    await prepareDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.use('/api', requireDatabase);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

const startServer = async () => {
  await prepareDatabase();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

if (require.main === module) {
  startServer();
}

const handler = (req, res) => app(req, res);

module.exports = handler;
module.exports.default = handler;
