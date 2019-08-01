import gql from "graphql-tag";

const CREATE_PROFIL= gql`
  mutation CreateProfil(
    $userId: String!
    $firstName: String!
    $lastName: String!
    $birthday: Date!
    $sexe: String
    $weight: String
    $size: String
    $bloodType: String
    $allergies: String
  ) {
    createProfil(
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      sexe: $sexe
      weight: $weight
      size: $size
      bloodType: $bloodType
      allergies: $allergies
    ) {
      userId
      id
      firstName
      lastName
      birthday
      sexe
      weight
      size
      bloodType
      allergies
    }
  }
`;
export default CREATE_PROFIL
