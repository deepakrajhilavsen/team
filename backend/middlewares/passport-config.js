require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Strategy: BearerStrategy } = require("passport-http-bearer");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, FORBIDDEN } = require("../Utils/constants");
const findUser = require("../auth/db/findUser");
const CustomError = require("../Utils/customError");
const findOrCreateGoogleUser = require("../auth/db/findOrCreateGoogleUser");

const credentials = async (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password", session: false },
      async (username, password, done) => {
        const user = await findUser(username);
        if (!user || (user.googleId && !user.hash)) {
          return done(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status)
          );
        }
        const passwordMatch = await bcrypt.compare(password, user.hash);
        if (passwordMatch) {
          return done(null, user);
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALL_BACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateGoogleUser(profile);
          return done(null, user);
        } catch (err) {
          return done(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status)
          );
        }
      }
    )
  );
};

module.exports = {
  credentials,
};
