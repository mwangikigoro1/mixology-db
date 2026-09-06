const Cocktail = require('../models/Cocktail');

// ─── GET all cocktails with optional filters ────────────────────────────────
exports.getCocktails = async (req, res) => {
  try {
    const { search, category, ingredient, minRating, isLocal, occasion } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameSwahili: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (ingredient) query['ingredients.name'] = { $regex: ingredient, $options: 'i' };
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (isLocal !== undefined) query.isLocal = isLocal === 'true';
    if (occasion) query.occasions = occasion;

    const cocktails = await Cocktail.find(query)
      .sort({ rating: -1, name: 1 })
      .limit(100);

    res.json(cocktails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET single cocktail by ID ───────────────────────────────────────────────
exports.getCocktailById = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' });
    res.json(cocktail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET random suggestions ──────────────────────────────────────────────────
exports.getSuggestions = async (req, res) => {
  try {
    const { limit = 4 } = req.query;
    const cocktails = await Cocktail.aggregate([
      { $sample: { size: parseInt(limit) } },
      { $project: { name: 1, image: 1, category: 1, rating: 1, isLocal: 1, difficulty: 1, priceKES: 1 } }
    ]);
    res.json(cocktails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET random single cocktail ──────────────────────────────────────────────
exports.getRandomCocktail = async (req, res) => {
  try {
    const [cocktail] = await Cocktail.aggregate([{ $sample: { size: 1 } }]);
    if (!cocktail) return res.status(404).json({ error: 'No cocktails found' });
    res.json(cocktail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET cocktail of the day (deterministic from date) ───────────────────────
exports.getCocktailOfTheDay = async (req, res) => {
  try {
    const count = await Cocktail.countDocuments();
    if (count === 0) return res.status(404).json({ error: 'No cocktails found' });

    // Use today's date as a seed so it changes daily but is consistent within a day
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % count;

    const cocktail = await Cocktail.findOne().skip(index);
    res.json(cocktail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET cocktails matching a list of ingredients (Cocktail Builder) ─────────
exports.findByIngredients = async (req, res) => {
  try {
    // Accepts ?ingredients=Vodka,Lime,Mint  (comma-separated)
    const raw = req.query.ingredients || '';
    const ingredients = raw.split(',').map(i => i.trim()).filter(Boolean);

    if (ingredients.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one ingredient' });
    }

    // Each ingredient must match at least one entry in the ingredients array
    const orConditions = ingredients.map(ing => ({
      'ingredients.name': { $regex: ing, $options: 'i' }
    }));

    const cocktails = await Cocktail.find({ $or: orConditions })
      .sort({ rating: -1 })
      .limit(20);

    // Attach a matchCount so the frontend can sort by best match
    const scored = cocktails.map(c => {
      const names = c.ingredients.map(i => i.name.toLowerCase());
      const matchCount = ingredients.filter(ing =>
        names.some(n => n.includes(ing.toLowerCase()))
      ).length;
      return { ...c.toObject(), matchCount };
    });

    scored.sort((a, b) => b.matchCount - a.matchCount);
    res.json(scored);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── POST create cocktail (auth required) ────────────────────────────────────
exports.createCocktail = async (req, res) => {
  try {
    const cocktail = new Cocktail(req.body);
    await cocktail.save();
    res.status(201).json(cocktail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ─── PUT update star rating (auth required) ──────────────────────────────────
exports.updateRating = async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' });

    cocktail.rating = ((cocktail.rating * cocktail.totalReviews) + rating) / (cocktail.totalReviews + 1);
    cocktail.totalReviews += 1;
    await cocktail.save();

    res.json({ rating: cocktail.rating, totalReviews: cocktail.totalReviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── POST add a review/comment (auth required) ───────────────────────────────
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' });

    // Prevent duplicate reviews from the same user
    const existing = cocktail.reviews.find(r => r.userId?.toString() === req.userId);
    if (existing) {
      return res.status(400).json({ error: 'You have already reviewed this cocktail' });
    }

    // Get username from User model
    const User = require('../models/User');
    const user = await User.findById(req.userId).select('username');
    if (!user) return res.status(404).json({ error: 'User not found' });

    cocktail.reviews.push({ userId: req.userId, username: user.username, rating, comment });

    // Recalculate aggregate rating
    const totalRating = cocktail.reviews.reduce((sum, r) => sum + r.rating, 0);
    cocktail.rating = totalRating / cocktail.reviews.length;
    cocktail.totalReviews = cocktail.reviews.length;

    await cocktail.save();
    res.status(201).json({
      reviews: cocktail.reviews,
      rating: cocktail.rating,
      totalReviews: cocktail.totalReviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── DELETE a review (owner or same user) ────────────────────────────────────
exports.deleteReview = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' });

    const reviewIndex = cocktail.reviews.findIndex(
      r => r._id.toString() === req.params.reviewId && r.userId?.toString() === req.userId
    );
    if (reviewIndex === -1) {
      return res.status(403).json({ error: 'Review not found or not authorised' });
    }

    cocktail.reviews.splice(reviewIndex, 1);

    // Recalculate
    if (cocktail.reviews.length > 0) {
      const totalRating = cocktail.reviews.reduce((sum, r) => sum + r.rating, 0);
      cocktail.rating = totalRating / cocktail.reviews.length;
    } else {
      cocktail.rating = 0;
    }
    cocktail.totalReviews = cocktail.reviews.length;

    await cocktail.save();
    res.json({ reviews: cocktail.reviews, rating: cocktail.rating, totalReviews: cocktail.totalReviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
