const fs = require("fs/promises");

const path = require("path");
// console.log("path ", path);
const { nanoid } = require("nanoid");
const { log } = require("console");

// console.log("__dirname(books)", __dirname); // шлях до папки в якій знаходиться файл в якому вона викликається
// const booksPath = `${__dirname}/books.json`;
const booksPath = path.join(__dirname, "books.json"); //в метод join ми передаємо частинки шляху(скільки завгодно через кому) і нормалізує шляхи, додає або видаляє "/"

const updateBooks = async (books) =>
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

const getAll = async () => {
  const result = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(result);
};

const getById = async (id) => {
  const books = await getAll();
  const bookId = String(id);
  const result = books.find((item) => item.id === bookId);
  return result || null;
};

const addBook = async ({ title, author }) => {
  const books = await getAll();

  const newBook = { id: nanoid(), title, author };
  books.push(newBook);

  await updateBooks(books);
  return newBook;
};

const updateById = async (id, data) => {
  const books = await getAll();
  const bookId = String(id);
  const index = books.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return null;
  }

  books[index] = { bookId, ...data };
  await updateBooks(books);
  return books[index];
};

const deleteById = async (id) => {
  const books = await getAll();
  const bookId = String(id);
  const index = books.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return null;
  }

  const [result] = books.splice(index, 1);

  await updateBooks(books);
  return result;
};

module.exports = {
  getAll,
  getById,
  addBook,
  updateById,
  deleteById,
};
