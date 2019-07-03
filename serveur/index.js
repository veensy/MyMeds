const TEMP_USER= {
    _id :"1",
    email:'test',
  }
  
  const typeDefs = 
    type User {
      _id: String,
          email:String
    }
  
      type Query {
          currentUser: User
      }

      type Mutation {
          login(email:String!,password:String!):User
          signup(email:String!,password:String!):User
      }
  
  
  
  const resolvers = {
    Query: {
      currentUser: () => {
        return TEMP_USER;
      },
    },
    Mutation:{
        login:(root,{email,password})=>{
            return TEMP_USER
        },
        signup:()=>{
            return TEMP_USER
        },
    }
  }
  
  
  