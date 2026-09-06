import React, { useState, useEffect } from 'react';

export default function Slideshow({ items = [], interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items, interval]);

  if (!items.length) return null;

  const current = items[index];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg">
      <img
        src={current.image}
        alt={current.name}
        className="w-full h-64 md:h-96 object-cover brightness-90"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute left-6 bottom-6 text-white">
        <h2 className="text-2xl md:text-4xl font-semibold">{current.name}</h2>
        <p className="mt-1 text-sm md:text-base text-white/90 max-w-lg">{current.description || ''}</p>
        {typeof current.priceKES === 'number' && (
          <div className="mt-3 text-lg font-semibold">KES {current.priceKES.toLocaleString()}</div>
        )}
      </div>
    </div>
  );
}
