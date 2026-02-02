import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { userSummary } from "../data/userData";
import { initialBooks } from "../data/booksData";

function UserDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(initialBooks);

  const issueBook = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, available: false } : book
      )
    );
  };

  const returnBook = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, available: true } : book
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header
        title="User Dashboard"
        subtitle="Library User Overview"
        rightAction={
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/user-profile")}
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

        {/* SUMMARY */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Account Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userSummary.map((item, index) => (
              <DashboardCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* BOOK ISSUE / RETURN */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Mythology Books
          </h2>

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

                {book.available ? (
                  <button
                    onClick={() => issueBook(book.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 transition px-4 py-1 rounded-lg"
                  >
                    Issue
                  </button>
                ) : (
                  <button
                    onClick={() => returnBook(book.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 transition px-4 py-1 rounded-lg"
                  >
                    Return
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default UserDashboard;
