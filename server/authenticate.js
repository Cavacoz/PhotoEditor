var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

const transport = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: config.user,
        pass: config.pass
    }
});

exports.sendPhotoToEmail = (email, img) => {
    transport.sendMail({
        from: config.user,
        to: email,
        subject: 'Your Image',
        attachments: [
            {   // encoded string as an attachment
                filename: 'Your Image.png',
                path: img
            }
        ],
        text: 'Thank you for using PhotoEditor.'
    })
        .catch(err => console.log(err));
};