import gql from "graphql-tag";

const CURRENT_MED = gql`
  mutation Med($id: String!) {
    med(id: $id) {
      id
      name
      duration
      startDate
      unit
      dosing
      alarm
      frequencies {
        hour
      }
    }
  }
`;

export default CURRENT_MED;
