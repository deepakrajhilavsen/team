const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  UNAUTHORIZED,
  FORBIDDEN,
  GOOGLE_ID_ALREADY_EXIST,
} = require("../Utils/constants");
const findAuth = require("../auth/db/findAuth");
const CustomError = require("../Utils/customError");
const findOrCreateGoogleAuth = require("../auth/db/findOrCreateGoogleAuth");

const tokenExtractor = (req) => {
  if (req && req.cookies) {
    const accessToken = req.cookies["accessToken"];
    return accessToken;
  }
  return null;
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
  secretOrKey: process.env.SECRET,
};

const credentials = async (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password", session: false },
      async (username, password, done) => {
        const user = await findAuth(username);
        if (!user) {
          return done(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status)
          );
        }
        if (user.googleId && !user.hash) {
          return done(
            new CustomError(
              GOOGLE_ID_ALREADY_EXIST.message,
              GOOGLE_ID_ALREADY_EXIST.status
            )
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
    new JwtStrategy(options, (jwt_payload, done) => {
      try {
        if (jwt_payload) {
          const user = jwt_payload;
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
          const googleUser = await findOrCreateGoogleAuth(profile);
          const user = {
            _id: googleUser._id,
            username: googleUser.username,
            profilePhoto: profile.photos[0].value,
            name: profile.displayName,
          };
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

module.exports = {
  credentials,
};
