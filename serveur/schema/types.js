const { gql } = require("apollo-server-express");
const { Date } = require("../models/scalar");

const typeDefs = gql`
  scalar Date

  type User {
    id: String!
    email: String
    jwt: String
    profils: [Profil]
  }

  type Profil {
    user: User
    id: String!
    userId: String
    firstName: String
    lastName: String
    birthday: Date
    sexe: String
    size: Int
    weight: Int
    bloodType: String
    allergies: String
    meds: [Med]
  }

  type Med {
    id: String
    profilId: String
    name: String
    duration: Int
    startDate: Date
    unit: String
    dosing: Float
    alarm: Boolean
    profils: Profil
    frequencies: [Frequency]
  }

  type Frequency {
    medId: String
    id: String
    hour: [Int]
    meds: Med
  }

  type Query {
    currentUser: User
    profils: [Profil]
    meds: [Med]
    frequencies: [Frequency]
  }

  type Mutation {
    createProfil(
      userId: String!
      firstName: String!
      lastName: String!
      birthday: Date!
      sexe: String!
      weight: Int!
      size: Int!
      bloodType: String!
      allergies: String!
    ): Profil

    createMed(
      name: String!
      duration: Int!
      startDate: Date!
      dosing: Int!
      unit: String!
      alarm: Boolean!
      profilId: String!
    ): Med

    createFrequency(medId: String!, hour: [Int!]): Frequency

    deleteUser(id: Int!): User
    updateUser(id: Int!, firstName: String!, lastName: String!): User
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;
module.exports = { typeDefs };
