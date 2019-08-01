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
    size: String
    weight: String
    bloodType: String
    allergies: String
    meds: [Med]
  }

  type Med {
    id: String
    profilId: String
    name: String
    duration: String
    startDate: Date
    unit: String
    dosing: String
    alarm: Boolean
    profils: Profil
    frequencies: [String]
  }

  type Query {
    currentUser: User
    profils: [Profil]
    meds: [Med]
  }

  type Mutation {
    createProfil(
      userId: String!
      firstName: String!
      lastName: String!
      birthday: Date!
      sexe: String!
      weight: String
      size: String
      bloodType: String
      allergies: String
    ): Profil

    editProfil(
      id: String!
      firstName: String
      lastName: String
      birthday: Date
      sexe: String
      weight: String
      size: String
      bloodType: String
      allergies: String
    ): Profil

    med(id: String!): Med

    deleteProfil(id: String!): Profil

    createMed(
      name: String!
      duration: String
      startDate: Date
      dosing: String
      unit: String
      alarm: Boolean
      profilId: String!
      frequencies: [String]
    ): Med

    editMed(
      id: String!
      name: String!
      duration: String
      startDate: Date
      dosing: String
      unit: String
      alarm: Boolean
      profilId: String!
      frequencies: [String]
    ): Med

    deleteMed(id: String!): Med

    deleteUser(id: String!): User

    updateUser(id: Int!, firstName: String!, lastName: String!): User

    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;
module.exports = { typeDefs };
