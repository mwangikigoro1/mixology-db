const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cocktail = require('../models/Cocktail');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('favorites', 'name image category rating');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { cocktailId } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const index = user.favorites.indexOf(cocktailId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(cocktailId);
    }
    
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShoppingList = async (req, res) => {
  try {
    const { ingredient, quantity, unit, checked, removeAll } = req.body;
    const user = await User.findById(req.userId);
    
    if (removeAll) {
      user.shoppingList = [];
    } else if (ingredient) {
      if (checked !== undefined) {
        const item = user.shoppingList.find(i => i.ingredient === ingredient);
        if (item) {
          item.checked = checked;
        }
      } else {
        user.shoppingList.push({ ingredient, quantity, unit, checked: false });
      }
    }
    
    await user.save();
    res.json({ shoppingList: user.shoppingList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { currency, units, language } = req.body;
    const user = await User.findById(req.userId);
    
    user.preferences = { ...user.preferences, ...req.body };
    await user.save();
    
    res.json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
