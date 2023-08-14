const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Taijul Islam",
    email: "taijul@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tanmoy Hassan",
    email: "tanmoy@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shahrin Akter ",
    email: "shahrin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
