import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaMagic, FaGlassWhiskey } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';
import CocktailCard from './CocktailCard';

// Commonly available ingredients grouped by type for quick-add chips
const QUICK_PICKS = {
  'Spirits': ['Vodka', 'Gin', 'White Rum', 'Dark Rum', 'Tequila', 'Bourbon', 'Whisky', 'Cognac', 'Konyagi'],
  'Mixers': ['Soda Water', 'Tonic Water', 'Ginger Beer', 'Lemonade', 'Cola'],
  'Juices': ['Lime Juice', 'Lemon Juice', 'Orange Juice', 'Pineapple Juice', 'Cranberry Juice', 'Passion Fruit Juice'],
  'Extras': ['Honey', 'Simple Syrup', 'Grenadine', 'Mint Leaves', 'Angostura Bitters', 'Egg White', 'Coconut Cream'],
};

export default function CocktailBuilder() {
  const [input, setInput]           = useState('');
  const [selected, setSelected]     = useState([]);
  const [results, setResults]       = useState([]);
  const [searched, setSearched]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const addIngredient = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (selected.includes(trimmed)) {
      toast.info(`${trimmed} is already in your list`);
      return;
    }
    setSelected(prev => [...prev, trimmed]);
    setInput('');
  };

  const removeIngredient = (name) => {
    setSelected(prev => prev.filter(i => i !== name));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addIngredient(input); }
    if (e.key === ',') { e.preventDefault(); addIngredient(input); }
  };

  const search = async () => {
    if (selected.length === 0) { toast.warning('Add at least one ingredient first'); return; }
    setLoading(true);
    try {
      const res = await api.get(`/cocktails/builder?ingredients=${selected.join(',')}`);
      setResults(res.data);
      setSearched(true);
      if (res.data.length === 0) toast.info('No cocktails found with those ingredients — try adding more!');
    } catch {
      toast.error('Search failed, please try again');
    }
    setLoading(false);
  };

  const clear = () => {
    setSelected([]);
    setResults([]);
    setSearched(false);
    setInput('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <FaMagic className="text-purple-500" /> Cocktail Builder
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Tell us what ingredients you have and we'll find matching cocktails.
        </p>
      </div>

      {/* Input area */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type an ingredient and press Enter or comma…"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={() => addIngredient(input)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Quick picks */}
        <div className="space-y-3">
          {Object.entries(QUICK_PICKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">{group}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(item => {
                  const active = selected.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => active ? removeIngredient(item) : addIngredient(item)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        active
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {active ? <span>✓ {item}</span> : item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected tags */}
        {selected.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Your ingredients ({selected.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.map(ing => (
                <span
                  key={ing}
                  className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                >
                  {ing}
                  <button onClick={() => removeIngredient(ing)} className="hover:text-red-500 transition-colors">
                    <FaTimes size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={search}
            disabled={loading || selected.length === 0}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            <FaGlassWhiskey />
            {loading ? 'Searching…' : 'Find Cocktails'}
          </button>
          {(selected.length > 0 || searched) && (
            <button
              onClick={clear}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {results.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {results.length} cocktail{results.length !== 1 ? 's' : ''} found — sorted by best match
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((cocktail, i) => (
                    <motion.div
                      key={cocktail._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {/* Match badge wrapper */}
                      <div className="relative">
                        {cocktail.matchCount > 0 && (
                          <span className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full shadow">
                            {cocktail.matchCount}/{selected.length} match
                          </span>
                        )}
                        <CocktailCard cocktail={cocktail} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <FaGlassWhiskey className="mx-auto text-5xl text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400">No cocktails matched those ingredients.</p>
                <p className="text-sm text-gray-400 mt-2">Try removing some ingredients or adding different ones.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
