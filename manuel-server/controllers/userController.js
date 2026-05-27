const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'manuel_webprog_secret', {
    expiresIn: '30d',
  });

const getUsers = async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      res.status(400).json({ message: 'Email or username already exists.' });
      return;
    }

    const user = await User.create({
      ...req.body,
      type: req.body.type || req.body.role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (!updateData.password) {
      delete updateData.password;
    }

    if (updateData.role && !updateData.type) {
      updateData.type = updateData.role;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    Object.assign(user, updateData);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ message: 'This account is inactive.' });
      return;
    }

    if ((user.type || user.role) === 'viewer') {
      res.status(403).json({ message: 'Viewers are not allowed to log in.' });
      return;
    }

    res.json({
      token: createToken(user._id),
      user,
      type: user.type || user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
