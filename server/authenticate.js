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
    host: 'smtp.office365.com',
    service: 'hotmail',
    secureConnection: false,
    port: 587,
    auth: {
        user: config.user,
        pass: config.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendPhotoToEmail = (email, img) => {
    console.log('email is being sent')
    console.log(config.user);
    console.log(config.pass);
    transport.sendMail({
        from: config.user,
        to: email,
        subject: 'Your Image',
        attachments: [
            {   // encoded string as an attachment
                filename: 'yourPhoto.png',
                contentType: 'image/png',
                content: new Buffer.from(img.split("base64,")[1], "base64"),
            }
        ],
        text: 'Thank you for using PhotoEditor.'
    })
        .catch(err => console.log(err));
};