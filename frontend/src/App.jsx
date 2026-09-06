import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CocktailDetail from './components/CocktailDetail';
import Favorites from './components/Favorites';
import ShoppingList from './components/ShoppingList';
import Login from './components/Login';
import Register from './components/Register';
import CocktailBuilder from './components/CocktailBuilder';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cocktail/:id" element={<CocktailDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/builder" element={<CocktailBuilder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" theme={theme} />
      </div>
    </AuthProvider>
  );
}

export default App;
