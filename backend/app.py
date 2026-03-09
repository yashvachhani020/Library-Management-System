from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "library.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if not os.path.exists(DB_NAME):
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        # 1. Users
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            enrollment_id TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user'
        )''')

        # 2. Books
        cursor.execute('''CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL
        )''')

        # 3. Transactions
        cursor.execute('''CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            book_id INTEGER NOT NULL,
            book_title TEXT NOT NULL,
            student_id TEXT NOT NULL,
            student_name TEXT NOT NULL,
            issue_date TEXT NOT NULL,
            return_date TEXT,
            status TEXT NOT NULL DEFAULT 'Active',
            FOREIGN KEY(book_id) REFERENCES books(id),
            FOREIGN KEY(student_id) REFERENCES users(enrollment_id)
        )''')

        # Seed Admin & Student
        cursor.execute("INSERT OR IGNORE INTO users (enrollment_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)", 
                       ('ADMIN-001', 'System Admin', 'admin@college.edu', 'admin123', 'admin'))
        cursor.execute("INSERT OR IGNORE INTO users (enrollment_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)", 
                       ('ENR-2026', 'Student Member', 'student@college.edu', '123', 'user'))

        # --- SEED DATA: BOOKS (80 Titles) ---
        cursor.execute("SELECT count(*) FROM books")
        if cursor.fetchone()[0] == 0:
            books_data = [
                # --- TECHNOLOGY (20) ---
                ("The Pragmatic Programmer", "Andy Hunt & Dave Thomas", "Tech", 12),
                ("Clean Code", "Robert C. Martin", "Tech", 15),
                ("Introduction to Algorithms", "Thomas H. Cormen", "Tech", 8),
                ("Design Patterns", "Erich Gamma", "Tech", 10),
                ("You Don't Know JS", "Kyle Simpson", "Tech", 20),
                ("Cracking the Coding Interview", "Gayle Laakmann McDowell", "Tech", 15),
                ("The Mythical Man-Month", "Frederick P. Brooks Jr.", "Tech", 7),
                ("Code Complete", "Steve McConnell", "Tech", 9),
                ("Head First Design Patterns", "Eric Freeman", "Tech", 14),
                ("Refactoring", "Martin Fowler", "Tech", 6),
                ("Clean Architecture", "Robert C. Martin", "Tech", 11),
                ("The Phoenix Project", "Gene Kim", "Tech", 18),
                ("Eloquent JavaScript", "Marijn Haverbeke", "Tech", 25),
                ("Grokking Algorithms", "Aditya Bhargava", "Tech", 13),
                ("Structure and Interpretation of Computer Programs", "Harold Abelson", "Tech", 5),
                ("Working Effectively with Legacy Code", "Michael Feathers", "Tech", 8),
                ("Domain-Driven Design", "Eric Evans", "Tech", 6),
                ("Test Driven Development", "Kent Beck", "Tech", 12),
                ("Soft Skills", "John Sonmez", "Tech", 20),
                ("The DevOps Handbook", "Gene Kim", "Tech", 9),

                # --- SCI-FI (20) ---
                ("Dune", "Frank Herbert", "Sci-Fi", 15),
                ("Project Hail Mary", "Andy Weir", "Sci-Fi", 20),
                ("The Martian", "Andy Weir", "Sci-Fi", 18),
                ("Neuromancer", "William Gibson", "Sci-Fi", 10),
                ("Foundation", "Isaac Asimov", "Sci-Fi", 12),
                ("1984", "George Orwell", "Sci-Fi", 30),
                ("Brave New World", "Aldous Huxley", "Sci-Fi", 25),
                ("Snow Crash", "Neal Stephenson", "Sci-Fi", 9),
                ("The Three-Body Problem", "Cixin Liu", "Sci-Fi", 14),
                ("Ender's Game", "Orson Scott Card", "Sci-Fi", 22),
                ("Hyperion", "Dan Simmons", "Sci-Fi", 7),
                ("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "Sci-Fi", 18),
                ("Ready Player One", "Ernest Cline", "Sci-Fi", 16),
                ("Do Androids Dream of Electric Sheep?", "Philip K. Dick", "Sci-Fi", 11),
                ("Jurassic Park", "Michael Crichton", "Sci-Fi", 14),
                ("The Time Machine", "H.G. Wells", "Sci-Fi", 8),
                ("War of the Worlds", "H.G. Wells", "Sci-Fi", 9),
                ("Starship Troopers", "Robert A. Heinlein", "Sci-Fi", 10),
                ("I, Robot", "Isaac Asimov", "Sci-Fi", 13),
                ("Fahrenheit 451", "Ray Bradbury", "Sci-Fi", 20),

                # --- HISTORY (20) ---
                ("Sapiens", "Yuval Noah Harari", "History", 25),
                ("Guns, Germs, and Steel", "Jared Diamond", "History", 15),
                ("The Silk Roads", "Peter Frankopan", "History", 10),
                ("1491", "Charles C. Mann", "History", 8),
                ("A Short History of Nearly Everything", "Bill Bryson", "History", 20),
                ("Homo Deus", "Yuval Noah Harari", "History", 18),
                ("The Diary of a Young Girl", "Anne Frank", "History", 30),
                ("Genghis Khan and the Making of the Modern World", "Jack Weatherford", "History", 12),
                ("The Rise and Fall of the Third Reich", "William L. Shirer", "History", 6),
                ("SPQR: A History of Ancient Rome", "Mary Beard", "History", 9),
                ("1776", "David McCullough", "History", 14),
                ("Alexander Hamilton", "Ron Chernow", "History", 10),
                ("The Guns of August", "Barbara W. Tuchman", "History", 7),
                ("A People's History of the United States", "Howard Zinn", "History", 15),
                ("The Devil in the White City", "Erik Larson", "History", 12),
                ("Midnight in Chernobyl", "Adam Higginbotham", "History", 16),
                ("The Splendid and the Vile", "Erik Larson", "History", 11),
                ("Iron Curtain", "Anne Applebaum", "History", 5),
                ("Dead Wake", "Erik Larson", "History", 9),
                ("Say Nothing", "Patrick Radden Keefe", "History", 8),

                # --- GENERAL / SELF-HELP (20) ---
                ("Atomic Habits", "James Clear", "General", 35),
                ("Deep Work", "Cal Newport", "General", 15),
                ("Thinking, Fast and Slow", "Daniel Kahneman", "General", 12),
                ("The Psychology of Money", "Morgan Housel", "General", 20),
                ("Rich Dad Poor Dad", "Robert Kiyosaki", "General", 25),
                ("How to Win Friends and Influence People", "Dale Carnegie", "General", 40),
                ("The 7 Habits of Highly Effective People", "Stephen R. Covey", "General", 30),
                ("Outliers", "Malcolm Gladwell", "General", 18),
                ("Quiet", "Susan Cain", "General", 14),
                ("Grit", "Angela Duckworth", "General", 16),
                ("Mindset", "Carol S. Dweck", "General", 22),
                ("The Power of Habit", "Charles Duhigg", "General", 19),
                ("Essentialism", "Greg McKeown", "General", 10),
                ("Zero to One", "Peter Thiel", "General", 14),
                ("Start with Why", "Simon Sinek", "General", 20),
                ("Good to Great", "Jim Collins", "General", 15),
                ("The Subtle Art of Not Giving a F*ck", "Mark Manson", "General", 28),
                ("Man's Search for Meaning", "Viktor E. Frankl", "General", 12),
                ("Principles", "Ray Dalio", "General", 9),
                ("The 4-Hour Workweek", "Timothy Ferriss", "General", 17)
            ]
            cursor.executemany("INSERT INTO books (title, author, category, quantity) VALUES (?, ?, ?, ?)", books_data)
            print("Added 80 best-selling books to database.")

        conn.commit()
        conn.close()

init_db()

# --- ROUTES ---

@app.route('/')
def home():
    return "Library Backend Running!"

# AUTH
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email=? AND password=?", (data['email'], data['password'])).fetchone()
    conn.close()
    if user:
        return jsonify({"success": True, "user": {"studentId": user['enrollment_id'], "name": user['name'], "role": user['role']}})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        conn = get_db_connection()
        conn.execute("INSERT INTO users (enrollment_id, name, email, password, role) VALUES (?, ?, ?, ?, 'user')",
                     (data['enrollment_id'], data['name'], data['email'], data['password']))
        conn.commit()
        conn.close()
        return jsonify({"success": True})
    except:
        return jsonify({"success": False, "message": "User exists"}), 400

# BOOKS
@app.route('/api/books', methods=['GET'])
def get_books():
    conn = get_db_connection()
    books = conn.execute("SELECT * FROM books").fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in books])

@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.json
    conn = get_db_connection()
    conn.execute("INSERT INTO books (title, author, category, quantity) VALUES (?, ?, ?, ?)",
                 (data['title'], data['author'], data['category'], data['quantity']))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route('/api/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    conn = get_db_connection()
    conn.execute("DELETE FROM books WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# TRANSACTIONS
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    conn = get_db_connection()
    txs = conn.execute("SELECT * FROM transactions ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in txs])

# SELF-SERVICE BORROW
@app.route('/api/borrow', methods=['POST'])
def borrow_book():
    data = request.json
    conn = get_db_connection()
    try:
        # 1. Check if user already has this book active
        existing = conn.execute(
            "SELECT * FROM transactions WHERE student_id=? AND book_id=? AND status='Active'",
            (data['student_id'], data['book_id'])
        ).fetchone()
        
        if existing:
            return jsonify({"success": False, "message": "You have already borrowed this book!"}), 400

        # 2. Check Stock
        book = conn.execute("SELECT * FROM books WHERE id=?", (data['book_id'],)).fetchone()
        if not book or book['quantity'] < 1:
            return jsonify({"success": False, "message": "Book out of stock"}), 400

        # 3. Create Transaction
        conn.execute('''INSERT INTO transactions 
                        (book_id, book_title, student_id, student_name, issue_date, status) 
                        VALUES (?, ?, ?, ?, ?, 'Active')''',
                     (data['book_id'], book['title'], data['student_id'], data['student_name'], datetime.now().strftime("%Y-%m-%d")))
        
        # 4. Decrease Quantity
        conn.execute("UPDATE books SET quantity = quantity - 1 WHERE id=?", (data['book_id'],))
        
        conn.commit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        conn.close()

# SELF-SERVICE RETURN
@app.route('/api/return', methods=['POST'])
def return_book():
    data = request.json
    conn = get_db_connection()
    try:
        # Find the ACTIVE transaction for this user & book
        tx = conn.execute(
            "SELECT * FROM transactions WHERE student_id=? AND book_id=? AND status='Active'",
            (data['student_id'], data['book_id'])
        ).fetchone()

        if not tx:
            return jsonify({"success": False, "message": "No active record found for this book."}), 400

        # Mark Returned
        conn.execute("UPDATE transactions SET status='Returned', return_date=? WHERE id=?", 
                     (datetime.now().strftime("%Y-%m-%d"), tx['id']))
        
        # Increase Quantity
        conn.execute("UPDATE books SET quantity = quantity + 1 WHERE id=?", (data['book_id'],))
        
        conn.commit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)