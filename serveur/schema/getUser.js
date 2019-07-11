const Users = require("../models/user");
const jwt = require("jsonwebtoken");

const getUser = async authorization => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if (err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result
          });
        }
      })
    );

    if (ok) {
      const user = await Users.findOne({ _id: result.id });
      return user;
    } else {
      return null;
    }
  }

  return null;
};

module.exports = { getUser };
