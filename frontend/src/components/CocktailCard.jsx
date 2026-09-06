import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaClock, FaGlassWhiskey } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function CocktailCard({ cocktail }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.warning('Please login to save favorites');
      return;
    }
    try {
      await api.post('/users/favorites', { cocktailId: cocktail._id });
      setIsFavorite(!isFavorite);
      setFavoriteCount(prev => isFavorite ? prev - 1 : prev + 1);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      toast.error('Failed to update favorites');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} size={12} />
    ));
  };

  return (
    <Link to={`/cocktail/${cocktail._id}`} className="group">
      <div className="glass rounded-xl overflow-hidden card-hover h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={cocktail.image || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&q=80'}
            alt={cocktail.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {typeof cocktail.priceKES === 'number' && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              KES {cocktail.priceKES.toLocaleString()}
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            {cocktail.isLocal && (
              <span className="px-2 py-0.5 bg-green-500/90 text-white text-xs font-medium rounded-full">
                🇰🇪 Local
              </span>
            )}
            <span className="px-2 py-0.5 bg-blue-500/90 text-white text-xs font-medium rounded-full">
              {cocktail.difficulty}
            </span>
          </div>
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className="text-white" size={16} />
            )}
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg line-clamp-1">{cocktail.name}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{cocktail.category}</span>
          </div>
          
          {cocktail.nameSwahili && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{cocktail.nameSwahili}</p>
          )}

          <div className="flex items-center gap-1 mb-2">
            {renderStars(cocktail.rating)}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({cocktail.totalReviews})</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {cocktail.ingredients.slice(0, 3).map((ing, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded-full">
                {ing.name}
              </span>
            ))}
            {cocktail.ingredients.length > 3 && (
              <span className="text-xs text-gray-500">+{cocktail.ingredients.length - 3}</span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-auto">
            <span className="flex items-center gap-1">
              <FaClock size={10} /> {cocktail.prepTime}m
            </span>
            <span className="flex items-center gap-1">
              <FaGlassWhiskey size={10} /> {cocktail.glass}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
