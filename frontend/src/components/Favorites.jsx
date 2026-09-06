import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import CocktailCard from './CocktailCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/profile');
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <FaHeart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Save Your Favorites</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Login to save and manage your favorite cocktails</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading favorites...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <FaHeart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-gray-500 dark:text-gray-400">Start exploring cocktails and save your favorites!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaHeart className="text-red-500" /> Your Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((cocktail, index) => (
          <motion.div
            key={cocktail._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <CocktailCard cocktail={cocktail} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
