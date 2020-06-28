const passport = require("passport");
const passportJWT = require("passport-jwt");
const db = require("./db.js");
const cfg = require("./config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

let strategy = new Strategy(params, function(payload, done) {
    let user = db.findUserById(payload.id)
    if (user) {
      return done(null, payload)
    } else {
      return done(new Error("User not found"), null)
    }
});
passport.use(strategy);

function initialize() {
    return passport.initialize()
}

function authenticate(req, resp, next) {
    return passport.authenticate("jwt", cfg.jwtSession)
}

module.exports = {
    initialize, authenticate
};