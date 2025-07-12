'use client';

import React, { useRef, useEffect } from 'react';

const cardData = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description: `This is the description for card ${i + 1}.`,
}));

export default function BalanceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll otomatis
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let newScrollLeft =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      // Ulang ke awal jika di akhir
      if (newScrollLeft >= scrollWidth - clientWidth) {
        newScrollLeft = 0;
      }

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Ganti interval jika perlu

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cards</h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{
            maskImage: 'linear-gradient(to right, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {cardData.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-64 bg-white shadow-lg rounded-2xl p-4"
            >
              <h3 className="text-xl font-bold mb-2 text-purple-800">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
