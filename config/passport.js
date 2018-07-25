const jwtStrategy = require("passport-jwt").Strategy;
const jwtExtract = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const code = require("./keys");

let opts = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: code.jwtKey
};

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
