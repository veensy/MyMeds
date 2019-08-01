import gql from "graphql-tag";

export default gql`
  query CurrentUser {
    currentUser {
      email
      id
      profils {
        firstName
        lastName
        id
        birthday
        bloodType
        sexe
        size
        weight
        allergies
        meds {
          profilId
          duration
          startDate
          unit
          dosing
          alarm
          name
          id
          frequencies 
        }
      }
    }
  }
`;
