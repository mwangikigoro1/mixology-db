const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  toggleFavorite,
  updateShoppingList,
  updatePreferences
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.post('/favorites', auth, toggleFavorite);
router.put('/shopping-list', auth, updateShoppingList);
router.put('/preferences', auth, updatePreferences);

module.exports = router;
