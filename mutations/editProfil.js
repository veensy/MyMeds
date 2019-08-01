import gql from "graphql-tag";

const EDIT_PROFIL = gql`
  mutation EditProfil(
    $id: String!
    $firstName: String
    $lastName: String
    $birthday: Date
    $sexe: String
    $weight: String
    $size: String
    $bloodType: String
    $allergies: String
  ) {
    editProfil(
      id: $id
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      sexe: $sexe
      weight: $weight
      size: $size
      bloodType: $bloodType
      allergies: $allergies
    ) {
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
export default EDIT_PROFIL;
