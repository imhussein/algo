const gql = require("graphql-tag");
const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  ApolloError,
} = require("apollo-server");
require("colors");

const typeDefs = gql`
  type User {
    name: String!
  }

  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me(_, ...args) {
      return {
        name: "Mohamed",
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError(error) {
    return error.extensions["code"];
  },
});

const port = 4000;
server.listen(port, () =>
  console.log(`GraphQL Listening On Port ${port}`.yellow.bold)
);
