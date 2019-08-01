import gql from "graphql-tag";

const CREATE_MED = gql`
  mutation CreateMed(
    $name: String!
    $duration: String
    $startDate: Date
    $dosing: String
    $unit: String
    $alarm: Boolean
    $profilId: String!
    $frequencies: [String]
  ) {
    createMed(
      name: $name
      duration: $duration
      startDate: $startDate
      dosing: $dosing
      unit: $unit
      alarm: $alarm
      profilId: $profilId
      frequencies: $frequencies
    ) {
      name
      duration
      startDate
      dosing
      alarm
      frequencies
      profilId
      unit
      id
    }
  }
`;
export default CREATE_MED;
