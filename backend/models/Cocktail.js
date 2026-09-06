const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nameSwahili: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whisky', 'Brandy', 'Liqueur', 'Non-Alcoholic', 'Kenyan Special']
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      enum: ['ml', 'oz', 'cl', 'dash', 'splash', 'tsp', 'tbsp', 'parts', 'whole'],
      default: 'ml'
    },
    isLocal: {
      type: Boolean,
      default: false
    }
  }],
  instructions: {
    type: String,
    required: true
  },
  instructionsSwahili: {
    type: String
  },
  glass: {
    type: String,
    required: true
  },
  garnish: {
    type: String
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&q=80'
  },
  images: [{
    type: String
  }],
  videoUrl: {
    type: String
  },
  priceKES: {
    type: Number,
    default: 0
  },
  prepTime: {
    type: Number,
    default: 5
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Advanced'],
    default: 'Easy'
  },
  occasions: [{
    type: String,
    enum: ['Party', 'Romantic', 'Casual', 'Celebration', 'Relaxation']
  }],
  substitutions: [{
    ingredient: { type: String },
    substitute: { type: String },
    note: { type: String }
  }],
  isLocal: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

cocktailSchema.index({ name: 'text', nameSwahili: 'text', ingredients: 'text' });

module.exports = mongoose.model('Cocktail', cocktailSchema);
