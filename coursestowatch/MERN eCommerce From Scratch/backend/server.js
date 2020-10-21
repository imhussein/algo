import express from "express";
import products from "./data/data.js";
import cors from "cors";
import dotenv from "dotenv";
import Mongoose from "mongoose";
import "colors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema, model: Model } = Mongoose;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({
  path: "./backend/.env",
});

export async function connectToMongo(uri) {
  try {
    const conn = await Mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectToMongo("mongodb://brad:Mohamedbrad1@ds031877.mlab.com:31877/brad")
  .then((conn) =>
    console.log(`DB Connected on host ${conn.connection.host}`.green.bold)
  )
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!value) {
            throw Error("Name is required");
          }
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          if (!value) {
            throw Error("Email is required");
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!value) {
            throw new Error("Password is required");
          }
        },
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const User = Model("User", UserSchema);

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        if (!value) {
          throw Error("Name is required");
        }
      },
    },
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [ReviewSchema],
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Product = Model("Product", ProductSchema);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
export const Order = Model("Order", OrderSchema);

const port = process.env.DEV_PORT;

app.get("/", (req, res) => {
  res.send({
    success: true,
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

function genWebToken(id) {
  return jwt.sign({ id }, "abcd123", {
    expiresIn: "30d",
  });
}

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: genWebToken(user._id),
        });
      } else {
        res.status(401).json({
          message: "Invalid Email And Password",
        });
      }
    } else {
      res.json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

async function authMiddleware(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.authorization, "abcd123");
    req.user = await User.findOne({ _id: decoded.id }).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
}

app.get("/user", authMiddleware, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
