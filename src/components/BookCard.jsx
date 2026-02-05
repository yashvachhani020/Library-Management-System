import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookCard({ book }) {
  const { issueBook, transactions } = useLibrary();
  const { user } = useAuth();

  // Check if THIS user already has this book active
  const hasBorrowed = transactions.some(t => 
    t.bookId === book.id && t.userId === user?.email && t.status === "Active"
  );

  const isOutOfStock = book.quantity === 0;

  const handleIssue = () => {
    if (hasBorrowed) return alert("You already have a copy of this book!");
    issueBook(book.id, user);
  };

  return (
    <div className="group relative bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
      
      {/* Cover */}
      <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
        <BookOpen size={32} className="text-slate-600 group-hover:text-blue-400 transition-colors duration-300" />
        
        {/* Quantity Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
          isOutOfStock 
            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        }`}>
          {isOutOfStock ? "Out of Stock" : `${book.quantity} Left`}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-slate-400 text-xs mt-1 truncate">{book.author}</p>
        <p className="text-[10px] text-blue-400 mt-2 uppercase tracking-wider font-semibold">
          {book.category}
        </p>
      </div>

      {/* Hover Action */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        {hasBorrowed ? (
           <div className="text-emerald-400 font-bold flex flex-col items-center">
             <CheckCircle size={24} className="mb-2" />
             Borrowed
           </div>
        ) : (
          <button
            onClick={handleIssue}
            disabled={isOutOfStock}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
              isOutOfStock 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            {isOutOfStock ? (
              <><AlertCircle size={16} /> Empty</>
            ) : (
              <><CheckCircle size={16} /> Issue Book</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}