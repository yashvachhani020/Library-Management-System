import React, { createContext, useState, useContext } from "react";

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  // Expanded Mock Data: 18 Books
  const [books, setBooks] = useState([
    // --- TECH ---
    { id: 1, title: "The Pragmatic Programmer", author: "Andy Hunt", category: "Tech", quantity: 12 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Tech", quantity: 15 },
    { id: 3, title: "Design Patterns", author: "Erich Gamma", category: "Tech", quantity: 5 },
    { id: 4, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Tech", quantity: 8 },
    { id: 5, title: "Refactoring UI", author: "Adam Wathan", category: "Tech", quantity: 7 },
    { id: 6, title: "You Don't Know JS", author: "Kyle Simpson", category: "Tech", quantity: 20 },

    // --- SCI-FI ---
    { id: 7, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", quantity: 8 },
    { id: 8, title: "Project Hail Mary", author: "Andy Weir", category: "Sci-Fi", quantity: 10 },
    { id: 9, title: "Foundation", author: "Isaac Asimov", category: "Sci-Fi", quantity: 6 },
    { id: 10, title: "Neuromancer", author: "William Gibson", category: "Sci-Fi", quantity: 4 },
    { id: 11, title: "The Martian", author: "Andy Weir", category: "Sci-Fi", quantity: 12 },

    // --- HISTORY ---
    { id: 12, title: "Sapiens", author: "Yuval Noah Harari", category: "History", quantity: 14 },
    { id: 13, title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", quantity: 9 },
    { id: 14, title: "The Silk Roads", author: "Peter Frankopan", category: "History", quantity: 5 },
    { id: 15, title: "1491", author: "Charles C. Mann", category: "History", quantity: 7 },

    // --- GENERAL / SELF-HELP ---
    { id: 16, title: "Atomic Habits", author: "James Clear", category: "General", quantity: 20 },
    { id: 17, title: "Deep Work", author: "Cal Newport", category: "General", quantity: 11 },
    { id: 18, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "General", quantity: 6 },
  ]);

  // Mock Data: Transactions
  const [transactions, setTransactions] = useState([
    { id: 101, bookId: 7, bookTitle: "Dune", userName: "Student Member", userId: "STU-001", issueDate: "2/6/2026", status: "Active" },
    { id: 102, bookId: 2, bookTitle: "Clean Code", userName: "John Doe", userId: "STU-042", issueDate: "2/8/2026", status: "Active" }
  ]);

  // Actions
  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const issueBook = (transaction) => {
    // 1. Add the transaction record
    setTransactions([transaction, ...transactions]);

    // 2. REAL UPDATE: Decrease the book quantity by 1
    setBooks((prevBooks) => 
      prevBooks.map((book) => 
        book.id === transaction.bookId 
          ? { ...book, quantity: Math.max(0, book.quantity - 1) } // Prevent negative stock
          : book
      )
    );
  };

  return (
    <LibraryContext.Provider value={{ books, transactions, addBook, deleteBook, issueBook }}>
      {children}
    </LibraryContext.Provider>
  );
};