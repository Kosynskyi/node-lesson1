const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
// CommonJS
// const nodemon = require("nodemon")
// якщо імпорт з npm пакету, то пишемо назву npm пакету
// якщо імпорт з якогось файлу, то пишемо шлях до того файлу

// const users = require("./users");
// console.log(users);
// console.log(users.admins);
// const { clients } = require("./users");
// console.log("clients ", clients);

console.log("Welcome to node.js");

const { log } = require("console");
// const { getCurrentMonth } = require("./date");

// const currentMonth = getCurrentMonth();
// console.log("currentMonth ", currentMonth);

// const currentMonth = require("./date").getCurrentMonth(); // можна одразу викликати функцію під час імпорту, не зберігаючи в окрему змінну
// console.log(currentMonth);

// ==================================
// для роботи з файлами використовується глобальний пакет fs(file system) глобальний пакет, який влаштований в node.js

const fs = require("fs/promises");

// fs.readFile("./work-with-files/file.txt", (error, data) => {
//   console.log(error);
//   console.log(data);
// });

// fs.readFile("./work-with-files/file.txt")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// const fileOperations = async ({ action, data }) => {
//   switch (action) {
//     case "read":
//       //   const result = await fs.readFile(filePath);
//       //   const text = result.toString();

//       const text = await fs.readFile(filePath, "utf-8");
//       console.log(text);
//       break;

//     case "add":
//       await fs.appendFile(filePath, data);
//       break;

//     case "replace":
//       await fs.writeFile(filePath, data);
//       break;

//     default:
//       console.log("Unknown action");
//       break;
//   }
// };

// const filePath = "./work-with-files/file.txt";

// fileOperations({ action: "read", filePath });
// fileOperations({ action: "add", filePath, data: "\nQweqweqe 123123123" }); // якщо ми хочемо додати файл, якого немає, то він його створить
// fileOperations({ action: "replace", filePath, data: "кодекс Ванги" }); // якщо ми хочемо перезаписати файл, якого немає, то він його створить

const books = require("./work-with-json-files/books");
const { hide } = require("yargs");

// books.getAll();
// console.log("__dirname(index)", __dirname);

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "getAll":
      const allBooks = await books.getAll();
      console.log(allBooks);
      break;
    case "getById":
      const getBookById = await books.getById(id);
      console.log(getBookById);
      break;
    case "addBook":
      const addNewBook = await books.addBook({ title, author });
      console.log(addNewBook);
      break;
    case "updateById":
      const updateBook = await books.updateById(id, { title, author });
      console.log(updateBook);
      break;

    case "deleteById":
      const deletedBook = await books.deleteById(id);
      console.log(deletedBook);
      break;

    default:
      console.log("Unknown action");
  }
};

// invokeAction({ action: "getAll" });
// invokeAction({ action: "getById", id: "1" });
// invokeAction({ action: "addBook", title: "New title", author: "New author" });
// invokeAction({
//   action: "updateById",
//   id: "8lZilu0Zndly3CioXx3gV",
//   title: "New title__new",
//   author: "New author",
// });
// invokeAction({
//   action: "deleteById",
//   id: "8lZilu0Zndly3CioXx3gV",
// });

const arr = hideBin(process.argv);

const { argv } = yargs(arr);
invokeAction(argv);

console.log(process.argv);
