import dotenv from "dotenv";
import "colors";
import users from "./data/users.js";
import products from "./data/data.js";
import { connectToMongo, User, Product, Order } from "./server.js";

connectToMongo("mongodb://brad:Mohamedbrad1@ds031877.mlab.com:31877/brad")
  .then((conn) =>
    console.log(`DB Connected on host ${conn.connection.host}`.green.bold)
  )
  .catch((err) => {
    console.log(err);
  });

dotenv.config({
  path: "./.env",
});

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);
    console.log("Data Imported".green.inverse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed".green.inverse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-D") {
  destroyData();
} else {
  importData();
}
