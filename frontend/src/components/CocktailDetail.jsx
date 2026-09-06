import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaStar, FaRegStar, FaClock, FaGlassWhiskey, FaArrowLeft,
  FaShoppingCart, FaHeart, FaRegHeart, FaShare, FaTrash, FaExchangeAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// ─── Star picker ────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl focus:outline-none"
        >
          {n <= (hover || value)
            ? <FaStar className="text-yellow-400" />
            : <FaRegStar className="text-gray-400" />}
        </button>
      ))}
    </div>
  );
}

export default function CocktailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cocktail, setCocktail]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSubs, setShowSubs]     = useState(false);

  // Review form state
  const [reviewRating, setReviewRating]   = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting]       = useState(false);

  useEffect(() => { fetchCocktail(); }, [id]);

  const fetchCocktail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cocktails/${id}`);
      setCocktail(res.data);
    } catch {
      toast.error('Cocktail not found');
      navigate('/');
    }
    setLoading(false);
  };

  const handleFavorite = async () => {
    if (!user) { toast.warning('Please login to save favorites'); return; }
    try {
      await api.post('/users/favorites', { cocktailId: id });
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch { toast.error('Failed to update favorites'); }
  };

  const addToShoppingList = async () => {
    if (!user) { toast.warning('Please login to add to shopping list'); return; }
    try {
      for (const ing of cocktail.ingredients) {
        await api.put('/users/shopping-list', { ingredient: ing.name, quantity: ing.amount, unit: ing.unit });
      }
      toast.success('Added all ingredients to shopping list!');
    } catch { toast.error('Failed to update shopping list'); }
  };

  const shareCocktail = () => {
    if (navigator.share) {
      navigator.share({ title: cocktail.name, text: `Check out ${cocktail.name} on Mixology DB!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.warning('Please login to leave a review'); return; }
    if (reviewRating === 0) { toast.warning('Please select a star rating'); return; }
    setSubmitting(true);
    try {
      const res = await api.post(`/cocktails/${id}/reviews`, { rating: reviewRating, comment: reviewComment });
      setCocktail(prev => ({ ...prev, reviews: res.data.reviews, rating: res.data.rating, totalReviews: res.data.totalReviews }));
      setReviewRating(0);
      setReviewComment('');
      toast.success('Review submitted!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit review');
    }
    setSubmitting(false);
  };

  const deleteReview = async (reviewId) => {
    try {
      const res = await api.delete(`/cocktails/${id}/reviews/${reviewId}`);
      setCocktail(prev => ({ ...prev, reviews: res.data.reviews, rating: res.data.rating, totalReviews: res.data.totalReviews }));
      toast.success('Review deleted');
    } catch { toast.error('Failed to delete review'); }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar key={i} size={12} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
    ));

  if (loading) return <div className="flex items-center justify-center h-96">Loading...</div>;
  if (!cocktail) return <div className="text-center py-16">Cocktail not found</div>;

  const userAlreadyReviewed = cocktail.reviews?.some(r => r.userId === user?._id);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="glass rounded-2xl overflow-hidden">
        {/* ── Top section: image + details ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image / video */}
          <div className="relative rounded-xl overflow-hidden">
            {cocktail.images?.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {cocktail.images.map((src, i) => (
                  <img key={i} src={src} alt={`${cocktail.name} ${i}`} className="w-full h-64 md:h-80 object-cover rounded-lg" />
                ))}
              </div>
            ) : (
              <img
                src={cocktail.image || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80'}
                alt={cocktail.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            )}
            {cocktail.isLocal && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full">
                🇰🇪 Kenyan Special
              </span>
            )}
            {cocktail.videoUrl && (
              <div className="mt-3">
                {cocktail.videoUrl.includes('youtube') ? (
                  <div className="aspect-video">
                    <iframe src={cocktail.videoUrl} title={cocktail.name} className="w-full h-full rounded-lg" allowFullScreen />
                  </div>
                ) : (
                  <video controls className="w-full mt-3 rounded-lg">
                    <source src={cocktail.videoUrl} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl font-bold">{cocktail.name}</h1>
                {cocktail.nameSwahili && <p className="text-gray-500 dark:text-gray-400">{cocktail.nameSwahili}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={handleFavorite} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  {isFavorite ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-600 dark:text-gray-400 text-xl" />}
                </button>
                <button onClick={shareCocktail} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <FaShare className="text-gray-600 dark:text-gray-400 text-xl" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {cocktail.rating?.toFixed(1)} ({cocktail.totalReviews} reviews)
              </span>
              <span className="flex items-center gap-1"><FaClock /> {cocktail.prepTime} min</span>
              <span className="flex items-center gap-1"><FaGlassWhiskey /> {cocktail.glass}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm">{cocktail.category}</span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm">{cocktail.difficulty}</span>
              {cocktail.occasions?.map(occ => (
                <span key={occ} className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm">🎉 {occ}</span>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{cocktail.instructions}</p>
            {cocktail.instructionsSwahili && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 italic">{cocktail.instructionsSwahili}</p>
            )}

            <div className="flex flex-col gap-2">
              <button onClick={addToShoppingList} className="w-full btn-primary flex items-center justify-center gap-2">
                <FaShoppingCart /> Add All Ingredients to Shopping List
              </button>
              {cocktail.substitutions?.length > 0 && (
                <button
                  onClick={() => setShowSubs(!showSubs)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaExchangeAlt /> {showSubs ? 'Hide' : 'Show'} Ingredient Substitutions
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Substitutions ── */}
        <AnimatePresence>
          {showSubs && cocktail.substitutions?.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-800">
                <h2 className="font-bold text-lg mt-4 mb-3 flex items-center gap-2">
                  <FaExchangeAlt className="text-blue-500" /> Ingredient Substitutions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cocktail.substitutions.map((sub, i) => (
                    <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="font-medium text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{sub.ingredient}</span>
                        <span className="mx-2 text-blue-500">→</span>
                        <span className="text-blue-700 dark:text-blue-300">{sub.substitute}</span>
                      </p>
                      {sub.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Ingredients ── */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-lg mb-3">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cocktail.ingredients.map((ing, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span>{ing.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{ing.amount} {ing.unit}</span>
              </div>
            ))}
          </div>
          {cocktail.garnish && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">🍃 Garnish: {cocktail.garnish}</p>
          )}
        </div>

        {/* ── Reviews ── */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-lg mb-4">
            Reviews <span className="text-sm font-normal text-gray-500">({cocktail.reviews?.length || 0})</span>
          </h2>

          {/* Review form */}
          {user && !userAlreadyReviewed && (
            <form onSubmit={submitReview} className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p className="font-medium mb-2 text-sm">Leave a review</p>
              <StarPicker value={reviewRating} onChange={setReviewRating} />
              <textarea
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                placeholder="Share your thoughts (optional)..."
                maxLength={500}
                rows={3}
                className="w-full mt-3 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">{reviewComment.length}/500</span>
                <button
                  type="submit"
                  disabled={submitting || reviewRating === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {submitting ? 'Submitting…' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}

          {!user && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <a href="/login" className="text-blue-500 hover:underline">Log in</a> to leave a review.
            </p>
          )}

          {userAlreadyReviewed && (
            <p className="text-sm text-green-600 dark:text-green-400 mb-4">✓ You've already reviewed this cocktail.</p>
          )}

          {/* Existing reviews */}
          {cocktail.reviews?.length > 0 ? (
            <div className="space-y-4">
              {[...cocktail.reviews].reverse().map(review => (
                <div key={review._id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{review.username}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500 ml-1">{review.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      {user && review.userId === user._id && (
                        <button
                          onClick={() => deleteReview(review._id)}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete review"
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet — be the first!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
