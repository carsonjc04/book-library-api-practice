const express = require("express");
const app = express();

app.use(express.json());

// Fake DB
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];
let nextId = 3;

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET one book by id
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const newBook = { id: nextId++, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});

// PUT update an existing book (replace title/author)
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const updated = { id, title, author };
  books[index] = updated;

  res.json(updated);
});

// DELETE remove a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const deleted = books.splice(index, 1)[0];
  res.json(deleted);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
