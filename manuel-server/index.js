require('dotenv').config({ path: './manuel-server/.env' });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');
const seedArticles = require('./config/seedArticles');
const userRoutes = require('./routes/useRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Manuel server is running');
});

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  await seedArticles();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
