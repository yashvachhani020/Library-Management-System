import { createContext, useContext, useState, useEffect } from "react";

const LibraryContext = createContext();

// 1. DATASET WITH QUANTITIES
const defaultBooks = [
  // Tech
  { id: 1, title: "The Pragmatic Programmer", author: "Andy Hunt", category: "Tech", quantity: 15 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Tech", quantity: 20 },
  { id: 3, title: "Design Patterns", author: "Erich Gamma", category: "Tech", quantity: 12 },
  { id: 4, title: "Intro to Algorithms", author: "Thomas H. Cormen", category: "Tech", quantity: 8 },
  { id: 5, title: "Refactoring UI", author: "Adam Wathan", category: "Tech", quantity: 25 },
  
  // Sci-Fi
  { id: 7, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", quantity: 30 },
  { id: 8, title: "Project Hail Mary", author: "Andy Weir", category: "Sci-Fi", quantity: 18 },
  { id: 9, title: "Neuromancer", author: "William Gibson", category: "Sci-Fi", quantity: 10 },
  { id: 10, title: "Foundation", author: "Isaac Asimov", category: "Sci-Fi", quantity: 22 },
  { id: 11, title: "Snow Crash", author: "Neal Stephenson", category: "Sci-Fi", quantity: 14 },

  // History
  { id: 12, title: "Sapiens", author: "Yuval Noah Harari", category: "History", quantity: 40 },
  { id: 13, title: "The Silk Roads", author: "Peter Frankopan", category: "History", quantity: 15 },
  { id: 14, title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", quantity: 10 },
  { id: 15, title: "1491", author: "Charles C. Mann", category: "History", quantity: 12 },

  // General
  { id: 16, title: "Atomic Habits", author: "James Clear", category: "General", quantity: 50 },
  { id: 17, title: "Deep Work", author: "Cal Newport", category: "General", quantity: 25 },
  { id: 18, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "General", quantity: 18 },
  { id: 19, title: "Psychology of Money", author: "Morgan Housel", category: "General", quantity: 35 },
];

export function LibraryProvider({ children }) {
  // BOOKS STATE
  const [books, setBooks] = useState(() => {
    // Force reset to get new quantities (change key to v3)
    const saved = localStorage.getItem("lms_library_v3");
    return saved ? JSON.parse(saved) : defaultBooks;
  });

  // TRANSACTIONS LOG STATE (Who took what)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("lms_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lms_library_v3", JSON.stringify(books));
    localStorage.setItem("lms_transactions", JSON.stringify(transactions));
  }, [books, transactions]);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now(), quantity: 10 }; // Default new books to 10 copies
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  // SMART ISSUE: Decreases Stock, Adds to Log
  const issueBook = (bookId, user) => {
    setBooks(books.map(b => {
      if (b.id === bookId && b.quantity > 0) {
        // Create Transaction Log
        const newLog = {
          id: Date.now(),
          bookId: b.id,
          bookTitle: b.title,
          userId: user.email,
          userName: user.name,
          issueDate: new Date().toLocaleDateString(),
          dueDate: "Feb 28, 2026", // Simplified due date
          status: "Active"
        };
        setTransactions([...transactions, newLog]);
        return { ...b, quantity: b.quantity - 1 };
      }
      return b;
    }));
  };

  // SMART RETURN: Increases Stock, Updates Log
  const returnBook = (bookId, user) => {
    // 1. Mark transaction as returned
    const activeTx = transactions.find(t => t.bookId === bookId && t.userId === user.email && t.status === "Active");
    if (!activeTx) return;

    const updatedTx = transactions.map(t => 
      t.id === activeTx.id ? { ...t, status: "Returned", returnDate: new Date().toLocaleDateString() } : t
    );
    setTransactions(updatedTx);

    // 2. Increase stock
    setBooks(books.map(b => 
      b.id === bookId ? { ...b, quantity: b.quantity + 1 } : b
    ));
  };

  return (
    <LibraryContext.Provider value={{ books, transactions, addBook, deleteBook, issueBook, returnBook }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => useContext(LibraryContext);