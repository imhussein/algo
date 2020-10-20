import bcryptjs from "bcryptjs";

const users = [
  {
    name: "Mohamed Hussein",
    email: "mohamed@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Adam Smith",
    email: "smith@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;
