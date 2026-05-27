const Article = require('../models/Articles');

const getArticles = async (_req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });

    if (!article) {
      res.status(404).json({ message: 'Article not found.' });
      return;
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const existingArticle = await Article.findOne({ slug: req.body.slug });

    if (existingArticle) {
      res.status(400).json({ message: 'Article slug already exists.' });
      return;
    }

    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      res.status(404).json({ message: 'Article not found.' });
      return;
    }

    Object.assign(article, req.body);
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      res.status(404).json({ message: 'Article not found.' });
      return;
    }

    res.json({ message: 'Article deleted.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
