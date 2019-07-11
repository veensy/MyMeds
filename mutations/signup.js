import gql from "graphql-tag";

export default gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      email
      lastName
      firstName
    }
  }
`;
