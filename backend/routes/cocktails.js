const express = require('express');
const router = express.Router();
const {
  getCocktails,
  getCocktailById,
  getSuggestions,
  getRandomCocktail,
  getCocktailOfTheDay,
  findByIngredients,
  createCocktail,
  updateRating,
  addReview,
  deleteReview
} = require('../controllers/cocktailController');
const auth = require('../middleware/auth');

// Public routes
router.get('/',               getCocktails);
router.get('/suggestions',    getSuggestions);
router.get('/random',         getRandomCocktail);
router.get('/cocktail-of-the-day', getCocktailOfTheDay);
router.get('/builder',        findByIngredients);
router.get('/:id',            getCocktailById);

// Auth-protected routes
router.post('/',              auth, createCocktail);
router.put('/:id/rating',     auth, updateRating);
router.post('/:id/reviews',   auth, addReview);
router.delete('/:id/reviews/:reviewId', auth, deleteReview);

module.exports = router;
