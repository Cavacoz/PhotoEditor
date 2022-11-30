var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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

exports.sendEmail = function (email, img) {
    const msg = {
        to: email, // Change to your recipient
        from: config.user, // Change to your verified sender
        subject: 'Your photo from PhotoEditor',
        text: 'Thank you for using PhotoEditor!',
        html: `<img src=${img}></img>`,
        attachments: [
            {
                filename: 'testimage.png',
                type: 'image/png',
                content: new Buffer.from(img.split("base64,")[1], "base64").toString('base64'),
            }
        ]
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

/**
 * 
 * const transport = nodemailer.createTransport({
    host: 'outlook.office365.com',
    service: 'outlook',
    secureConnection: false,
    port: 993,
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
 * 
 * 
 */
