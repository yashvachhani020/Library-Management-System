import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH DATA
  const refreshLibrary = useCallback(async () => {
    try {
      const booksRes = await fetch("http://localhost:5000/api/books");
      const txRes = await fetch("http://localhost:5000/api/transactions");

      if (booksRes.ok) {
        const booksData = await booksRes.json();
        setBooks(booksData);
      }
      
      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData);
      }
    } catch (error) {
      console.error("Backend connection failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLibrary();
  }, [refreshLibrary]);


  // 2. BORROW BOOK (Self-Service)
  const borrowBook = async (bookId, studentId, studentName) => {
    try {
      const response = await fetch("http://localhost:5000/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: bookId,
          student_id: studentId,
          student_name: studentName
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await refreshLibrary();
        return { success: true };
      } else {
        alert(data.message); // e.g., "You already have this book"
        return { success: false };
      }
    } catch (error) {
      alert("Server connection failed");
      return { success: false };
    }
  };


  // 3. RETURN BOOK (Self-Service)
  const returnBook = async (bookId, studentId) => {
    try {
      const response = await fetch("http://localhost:5000/api/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          book_id: bookId, 
          student_id: studentId 
        }),
      });

      const data = await response.json();

      if (data.success) {
        await refreshLibrary();
        return { success: true };
      } else {
        alert(data.message);
        return { success: false };
      }
    } catch (error) {
      console.error("Return error:", error);
    }
  };


  // 4. ADMIN: ADD BOOK
  const addBook = async (book) => {
    try {
      await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      await refreshLibrary();
    } catch (error) {
      console.error("Add Book Error:", error);
    }
  };

  // 5. ADMIN: DELETE BOOK
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book permanently?")) return;
    try {
      await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
      await refreshLibrary();
    } catch (error) {
      console.error("Delete Book Error:", error);
    }
  };

  return (
    <LibraryContext.Provider value={{ 
      books, 
      transactions, 
      loading,
      refreshLibrary,
      addBook, 
      deleteBook, 
      borrowBook, // <--- New Name
      returnBook 
    }}>
      {children}
    </LibraryContext.Provider>
  );
};