import React from 'react';
import BookCard from './BookCard';

export default function CategorySection({ title, books = [] }) {
  if (books.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-white mb-4 px-1 border-l-4 border-blue-500 pl-3">
        {title}
      </h2>

      {/* The "Netflix" Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {books.map((book) => (
          <div key={book.id} className="snap-start flex-shrink-0 w-[200px]">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}