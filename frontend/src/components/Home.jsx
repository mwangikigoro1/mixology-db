import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import CocktailCard from './CocktailCard';
import Slideshow from './Slideshow';
import SearchBar from './SearchBar';
import CocktailOfTheDay from './CocktailOfTheDay';

const CATEGORIES = ['All', 'Vodka', 'Gin', 'Rum', 'Tequila', 'Whisky', 'Brandy', 'Liqueur', 'Non-Alcoholic', 'Kenyan Special'];
const OCCASIONS = ['Party', 'Romantic', 'Casual', 'Celebration', 'Relaxation'];

export default function Home() {
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    ingredient: '',
    minRating: '',
    isLocal: '',
    occasion: ''
  });

  useEffect(() => {
    fetchCocktails();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cocktails, filters]);

  const fetchCocktails = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cocktails');
      setCocktails(res.data);
      setFilteredCocktails(res.data);
    } catch (err) {
      console.error('Error fetching cocktails:', err);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...cocktails];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
      );
    }

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(c => c.category === filters.category);
    }

    if (filters.ingredient) {
      const ingLower = filters.ingredient.toLowerCase();
      filtered = filtered.filter(c =>
        c.ingredients.some(i => i.name.toLowerCase().includes(ingLower))
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(c => c.rating >= parseFloat(filters.minRating));
    }

    if (filters.isLocal !== '') {
      filtered = filtered.filter(c => c.isLocal === (filters.isLocal === 'true'));
    }

    if (filters.occasion) {
      filtered = filtered.filter(c => c.occasions?.includes(filters.occasion));
    }

    setFilteredCocktails(filtered);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      ingredient: '',
      minRating: '',
      isLocal: '',
      occasion: ''
    });
  };

  return (
    <div>
      {/* Hero / Slideshow */}
      <div className="mb-8">
        <Slideshow
          items={cocktails
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 5)
            .map(c => ({
              name: c.name,
              image: (c.images && c.images[0]) || c.image,
              description: c.nameSwahili || c.category,
              priceKES: c.priceKES
            }))}
        />
      </div>

      {/* Cocktail of the Day */}
      <CocktailOfTheDay />

      {/* Search & Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px]">
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            placeholder="Search cocktails or ingredients..."
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <FaFilter />
          Filters
        </button>
        {(filters.category !== 'All' || filters.ingredient || filters.minRating || filters.isLocal || filters.occasion) && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <FaTimes /> Clear
          </button>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {filteredCocktails.length} cocktails found
        </span>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-4 glass rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Ingredient</label>
                <input
                  type="text"
                  placeholder="e.g., Vodka, Lime"
                  value={filters.ingredient}
                  onChange={(e) => setFilters({ ...filters, ingredient: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Min Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Type</label>
                <select
                  value={filters.isLocal}
                  onChange={(e) => setFilters({ ...filters, isLocal: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="true">🇰🇪 Kenyan Specials</option>
                  <option value="false">International</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Occasion</label>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map(occ => (
                    <button
                      key={occ}
                      onClick={() => setFilters({ ...filters, occasion: filters.occasion === occ ? '' : occ })}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.occasion === occ
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredCocktails.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 dark:text-gray-400">No cocktails found matching your criteria</p>
          <button onClick={clearFilters} className="mt-4 btn-primary">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCocktails.map((cocktail, index) => (
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
      )}
    </div>
  );
}
