const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("../db");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Configure Passport
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "JWT_SECRET",
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  })(req, res, next);
};
