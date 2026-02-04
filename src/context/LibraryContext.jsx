import { createContext, useContext, useState, useEffect } from "react";

const LibraryContext = createContext();

const defaultBooks = [
  { id: 1, title: "The Pragmatic Programmer", author: "Andy Hunt", category: "Tech", status: "Available" },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Tech", status: "Issued" },
  { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available" },
  { id: 4, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", status: "Available" },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("lms_books");
    return saved ? JSON.parse(saved) : defaultBooks;
  });

  useEffect(() => {
    localStorage.setItem("lms_books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now(), status: "Available" };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const toggleStatus = (id) => {
    setBooks(books.map(b => 
      b.id === id ? { ...b, status: b.status === "Available" ? "Issued" : "Available" } : b
    ));
  };

  const getStats = () => ({
    total: books.length,
    issued: books.filter(b => b.status === "Issued").length,
    available: books.filter(b => b.status === "Available").length,
  });

  return (
    <LibraryContext.Provider value={{ books, addBook, deleteBook, toggleStatus, getStats }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => useContext(LibraryContext);