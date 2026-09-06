import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ShoppingList() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ ingredient: '', quantity: '', unit: 'ml' });

  useEffect(() => {
    if (user) {
      fetchShoppingList();
    }
  }, [user]);

  const fetchShoppingList = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/profile');
      setItems(res.data.shoppingList || []);
    } catch (err) {
      console.error('Error fetching shopping list:', err);
    }
    setLoading(false);
  };

  const toggleItem = async (ingredient) => {
    try {
      const item = items.find(i => i.ingredient === ingredient);
      await api.put('/users/shopping-list', {
        ingredient,
        checked: !item.checked
      });
      setItems(items.map(i =>
        i.ingredient === ingredient ? { ...i, checked: !i.checked } : i
      ));
    } catch (err) {
      toast.error('Failed to update item');
    }
  };

  const removeItem = async (ingredient) => {
    try {
      await api.put('/users/shopping-list', {
        ingredient: ingredient,
        checked: false
      });
      // Refresh to get updated list
      fetchShoppingList();
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.ingredient) return;
    try {
      await api.put('/users/shopping-list', newItem);
      fetchShoppingList();
      setNewItem({ ingredient: '', quantity: '', unit: 'ml' });
      toast.success('Item added to shopping list');
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const clearAll = async () => {
    if (!window.confirm('Clear all items?')) return;
    try {
      await api.put('/users/shopping-list', { removeAll: true });
      setItems([]);
      toast.success('Shopping list cleared');
    } catch (err) {
      toast.error('Failed to clear list');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <FaShoppingCart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Shopping List</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Login to create and manage your shopping list</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading shopping list...</div>;
  }

  const completedItems = items.filter(i => i.checked);
  const activeItems = items.filter(i => !i.checked);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaShoppingCart className="text-blue-600" /> Shopping List
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 text-red-500 hover:text-red-600 text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add item form */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-4">
            <h2 className="font-bold mb-3">Add Custom Item</h2>
            <form onSubmit={addItem} className="space-y-2">
              <input
                type="text"
                placeholder="Ingredient name"
                value={newItem.ingredient}
                onChange={(e) => setNewItem({ ...newItem, ingredient: e.target.value })}
                className="input-field"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Amount"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="input-field flex-1"
                />
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="input-field flex-1"
                >
                  <option value="ml">ml</option>
                  <option value="oz">oz</option>
                  <option value="cl">cl</option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                  <option value="whole">whole</option>
                  <option value="dash">dash</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <FaPlus /> Add Item
              </button>
            </form>
          </div>
        </div>

        {/* Shopping list items */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{items.length} items total</span>
              <span>{completedItems.length} completed</span>
            </div>

            {items.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Your shopping list is empty. Add items from cocktail details!
              </p>
            ) : (
              <div className="space-y-2">
                {activeItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(item.ingredient)}
                      className="w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center hover:border-blue-500 transition-colors"
                    >
                      {item.checked && <FaCheck className="text-blue-600" size={12} />}
                    </button>
                    <span className="flex-1 font-medium">{item.ingredient}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      onClick={() => removeItem(item.ingredient)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </motion.div>
                ))}

                {completedItems.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Completed</p>
                    {completedItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg line-through text-gray-400"
                      >
                        <button
                          onClick={() => toggleItem(item.ingredient)}
                          className="w-5 h-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center"
                        >
                          <FaCheck className="text-white" size={12} />
                        </button>
                        <span className="flex-1">{item.ingredient}</span>
                        <span className="text-sm">
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => removeItem(item.ingredient)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
