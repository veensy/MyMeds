require("dotenv").config();
const express = require("express");
const models = require("./serveur/models");
const mongoose = require("mongoose");
const { typeDefs } = require("./serveur/schema/types");
const { resolvers } = require("./serveur/schema/mutations");
const { ApolloServer } = require("apollo-server-express");
const { getUser } = require("./serveur/schema/getUser");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token);
    return { user };
  }
});
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => {
  console.log(
    `Serveur is listening at http://localhost:4000${server.graphqlPath}`
  );
});

const URI = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_PASS
}@mymeds-qez16.mongodb.net/mymeds?retryWrites=true&w=majority`;
if (!URI) {
  throw new Error("You must provide a URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(URI, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance"))
  .on("error", error => console.log("Error connecting to MongoLab", error));
