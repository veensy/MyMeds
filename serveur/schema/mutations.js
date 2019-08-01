const Users = require("../models/user");
const Profils = require("../models/profil");
const Meds = require("../models/med");
// const Frequencies = require("../models/frequency");
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

  User: {
    profils: (parentValue, args) => {
      const profil = Profils.find({ userId: parentValue.id });
      return profil;
    }
  },
  Profil: {
    meds: (parentValue, args) => {
      const med = Meds.find({ profilId: parentValue.id });
      return med;
    }
  },
  // Med: {
  //   frequencies: (parentValue, args) => {
  //     const frequency = Frequencies.find({ medId: parentValue.id });
  //     return frequency;
  //   }
  // },
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
      console.log("test");
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
    },
    createProfil: (
      parentValue,
      {
        lastName,
        firstName,
        birthday,
        sexe,
        size,
        bloodType,
        allergies,
        weight,
        userId
      },
      context
    ) => {
      return new Profils({
        userId,
        lastName,
        firstName,
        birthday,
        sexe,
        size,
        bloodType,
        allergies,
        weight
      }).save();
    },
    editProfil: (
      parentValue,
      {
        id,
        lastName,
        firstName,
        birthday,
        sexe,
        size,
        bloodType,
        allergies,
        weight,
        userId
      },
      context
    ) => {
      return Profils.findByIdAndUpdate(
        id,
        {
          lastName,
          firstName,
          birthday,
          sexe,
          size,
          bloodType,
          allergies,
          weight,
          userId
        },
        { omitUndefined: true }
      );
    },
    createMed: (
      parentValue,
      { name, duration, startDate, dosing, alarm, frequencies, profilId, unit },
      context
    ) => {
      return new Meds({
        name,
        duration,
        startDate,
        dosing,
        alarm,
        profilId,
        unit,
        frequencies
      }).save();
    },
    editMed: (
      parentValue,
      {
        id,
        name,
        duration,
        startDate,
        dosing,
        alarm,
        profilId,
        unit,
        frequencies
      },
      context
    ) => {
      return Meds.findByIdAndUpdate(
        id,
        {
          name,
          duration,
          startDate,
          dosing,
          alarm,
          profilId,
          unit,
          frequencies
        },
        { omitUndefined: true }
      );
    },
    deleteProfil: (parentValue, { id }, context) => {
      return Profils.findByIdAndDelete(id);
    },
    deleteMed: (parentValue, { id }, context) => {
      return Meds.findByIdAndDelete(id);
    },

    med: async (parentValue, { id }, context) => {
      console.log(id);

      const med = await Meds.findById({ _id: id });
      console.log(med);

      if (!med) {
        throw new Error("Med not found");
      }
      return med;
    }
  }
};

module.exports = { resolvers };
