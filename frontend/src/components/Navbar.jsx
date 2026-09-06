import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaMoon, FaSun, FaCocktail, FaMagic } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar({ theme, setTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass shadow-md">
      <div className="container mx-auto px-4 py-3 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          <FaCocktail />
          <span>Mixology DB</span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400 hidden sm:inline">🇰🇪</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Browse"
          >
            <FaSearch className="text-gray-700 dark:text-gray-300" />
          </Link>

          <Link
            to="/builder"
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Cocktail Builder"
          >
            <FaMagic className="text-purple-500" />
          </Link>

          {user && (
            <>
              <Link to="/favorites" className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" title="Favorites">
                <FaHeart className="text-gray-700 dark:text-gray-300" />
              </Link>
              <Link to="/shopping-list" className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" title="Shopping List">
                <FaShoppingCart className="text-gray-700 dark:text-gray-300" />
              </Link>
            </>
          )}

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}