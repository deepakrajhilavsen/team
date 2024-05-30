require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Strategy: BearerStrategy } = require("passport-http-bearer");
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, FORBIDDEN } = require("../Utils/constants");
const findUser = require("../auth/db/findUser");
const CustomError = require("../Utils/customError");

const credentials = async (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password", session: false },
      async (username, password, done) => {
        const user = await findUser(username);
        if (JSON.stringify(user) === "{}") {
          return done(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status)
          );
        }
        const passwordMatch = await bcrypt.compare(password, user.hash);
        if (passwordMatch) {
          return done(null, { id: user.id, username: user.username });
        } else {
          return done(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status)
          );
        }
      }
    )
  );

  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.exp && new Date().getTime() < decoded.exp * 1000) {
          const user = { id: decoded.id, username: decoded.username };
          return done(null, user);
        } else {
          return done(new CustomError(FORBIDDEN.message, FORBIDDEN.status));
        }
      } catch (err) {
        return done(new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status));
      }
    })
  );
};

module.exports = {
  credentials,
};
