const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    currentUser: (parentValue, args, context) => {
      return context.user.then(user => {
        if (!user) {
          return Promise.reject("Unauthorized");
        }
        return context.user;
      });
    }
  },
  Mutation: {
    login: async (parentValue, { email, password }, context) => {
      const user = await Users.findOne({ email });

      if (!user) {
        throw new Error("Email not found");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Password is incorrect");
      }
      if (user && validPassword) {
        user.jwt = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        context.user = Promise.resolve(user);
        return user;
      }
    },
    signup: async (parentValue, { email, password }, context) => {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new Error("Email already used");
      }
      const hash = await bcrypt.hash(password, 10);
      await Users.create({
        email,
        password: hash
      });
      const user = await Users.findOne({ email });
      user.jwt = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      context.user = Promise.resolve(user);
      return user;
    }
  }
};
module.exports = { resolvers };
