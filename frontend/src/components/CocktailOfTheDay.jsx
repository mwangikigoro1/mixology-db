import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaGlassWhiskey, FaDice } from 'react-icons/fa';
import api from '../services/api';

export default function CocktailOfTheDay() {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRandom, setIsRandom] = useState(false);

  const fetchCocktail = async (random = false) => {
    setLoading(true);
    try {
      const endpoint = random ? '/cocktails/random' : '/cocktails/cocktail-of-the-day';
      const res = await api.get(endpoint);
      setCocktail(res.data);
      setIsRandom(random);
    } catch {
      // silently fail — the rest of the page still works
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCocktail(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-48 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse mb-8" />
    );
  }

  if (!cocktail) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-8 shadow-lg"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cocktail.image})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
        {/* Text */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-1">
            {isRandom ? '🎲 Random Pick' : '🍹 Cocktail of the Day'}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{cocktail.name}</h2>
          {cocktail.nameSwahili && (
            <p className="text-gray-300 text-sm mb-3 italic">{cocktail.nameSwahili}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {cocktail.rating?.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {cocktail.prepTime} min
            </span>
            <span className="flex items-center gap-1">
              <FaGlassWhiskey /> {cocktail.glass}
            </span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{cocktail.difficulty}</span>
            {cocktail.isLocal && (
              <span className="px-2 py-0.5 bg-green-500/80 rounded-full text-xs text-white">🇰🇪 Kenyan</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/cocktail/${cocktail._id}`}
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors text-sm"
            >
              View Recipe
            </Link>
            <button
              onClick={() => fetchCocktail(true)}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors text-sm flex items-center gap-2"
            >
              <FaDice /> Surprise Me
            </button>
          </div>
        </div>

        {/* Ingredients preview */}
        <div className="hidden md:block bg-black/40 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Ingredients</p>
          <ul className="space-y-1">
            {cocktail.ingredients?.slice(0, 5).map((ing, i) => (
              <li key={i} className="text-sm text-white flex justify-between gap-3">
                <span>{ing.name}</span>
                <span className="text-gray-400">{ing.amount} {ing.unit !== 'whole' ? ing.unit : ''}</span>
              </li>
            ))}
            {cocktail.ingredients?.length > 5 && (
              <li className="text-xs text-gray-500">+{cocktail.ingredients.length - 5} more</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
