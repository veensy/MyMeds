const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    jwt: String
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User
    deleteUser(id: Int!): User
    updateUser(id: Int!, firstName: String!, lastName: String!): User
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;

module.exports = { typeDefs };
