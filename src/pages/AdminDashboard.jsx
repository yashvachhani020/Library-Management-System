import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { adminStats } from "../data/adminData";
import { initialBooks } from "../data/booksData";

function AdminDashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState(initialBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) return;

    setBooks([
      ...books,
      {
        id: Date.now(),
        title,
        author,
        category: "Mythology",
        available: true,
      },
    ]);

    setTitle("");
    setAuthor("");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header
        title="Admin Dashboard"
        subtitle="Library Administration Panel"
        rightAction={
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin-profile")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        }
      />

      <main className="p-8 space-y-12">

        {/* ADMIN STATS */}
        <section>
          <h2 className="text-xl font-semibold mb-6">
            System Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {adminStats.map((item, index) => (
              <DashboardCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* BOOK MANAGEMENT */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Book Management (Mythology)
          </h2>

          {/* Add Book */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 rounded-lg bg-black border border-white/20 w-full"
              />
              <input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="p-3 rounded-lg bg-black border border-white/20 w-full"
              />
              <button
                onClick={addBook}
                className="bg-emerald-600 hover:bg-emerald-700 transition px-6 rounded-lg"
              >
                Add Book
              </button>
            </div>
          </div>

          {/* Book List */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
              >
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm text-gray-400">
                    {book.author} • {book.category}
                  </p>
                </div>

                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-600 hover:bg-red-700 transition px-4 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
