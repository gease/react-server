const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
//const AnonymousStrategy = require('passport-anonymous').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const secret = require('../config').secret;
const User = require('../model/user');
const jwt = require("jsonwebtoken");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
    });
}))

//passport.use(new AnonymousStrategy());