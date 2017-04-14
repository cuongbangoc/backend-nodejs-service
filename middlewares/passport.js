'use strict';

// Importing Passport, strategies, and config
const passport = require('passport'),
      user_repo = require('../repositories/user_repository'),
      config = require('config'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const helper = require("../helpers/helpers");

// Setting username field to email rather than username
const localOptions = {
    usernameField: 'email'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    user_repo.findByEmail(email).then((err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        let isMatch = helper.compare_password(password, user.u_password);
        if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
        return done(null, user);
    });
});

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.get("jwt.jwt_secret")

    // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    user_repo.findById(payload.u_id, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = {
    requireAuth: requireAuth,
    requireLogin: requireLogin
}