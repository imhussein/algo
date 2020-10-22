const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
require("colors");
const mongoose = require("mongoose");

async function connectToMongo(uri) {
  try {
    const conn = await mongoose.connect(uri, {
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

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const models = { User };

const typeDefs = gql`
  enum Names {
    MOHAMED
    JANE
    DOE
  }

  interface HasID {
    id: ID
  }

  type User implements HasID {
    id: ID
    name: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    isAdmin: Boolean
    myName: Names
  }

  type Query {
    users: [User!]!
    user(id: ID): User!
    admin(userInput: UserInput): User
  }

  input UserInput {
    id: ID
  }
`;

async function getUser(_id) {
  const user = await User.findOne({ _id });
  return { ...user, myName: "JANE" };
}

const resolvers = {
  Query: {
    users: async (parentValue, args, { models: { User } }, info) => {
      const users = await User.find();
      return users.map((u) => ({ ...u, myName: "MOHAMED" }));
    },
    user: (parentValue, { id: _id }, { models: { User } }, info) => {
      return getUser(_id);
    },
    admin: (
      parentValue,
      { userInput: { id: _id } },
      { models: { User } },
      info
    ) => {
      return getUser(_id);
    },
  },
  User: {
    id: async (parentValue, args, { models: { User } }, info) => {
      return parentValue._id;
    },
    name: () => "Always Mohamed Hussein is The Name",
  },
  HasID: {
    __resolveType(parentValue) {
      if (parentValue.isAdmin) return "User";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => {
    return {
      models,
    };
  },
});

server.listen(4000, () =>
  console.log(`GraphQL Server Listening On Port ${4000}`.yellow.bold)
);
