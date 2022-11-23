var express = require('express');
var ImageKit = require('imagekit');

const authenticate = require('../authenticate')

const bodyParser = require('body-parser');
var User = require('../models/user');
var cors = require('./cors');
var Images = require('../models/collection');

var collectionRouter = express.Router();
collectionRouter.use(bodyParser.json());

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/nny7nrtku',
    publicKey: 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro=',
    privateKey: 'private_uSBxTRxiUf3VdwK4L2cx9OLpWlI='
});

collectionRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

collectionRouter.get('/auth', cors.corsWithOptions, function (req, res, next) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

collectionRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
});

collectionRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    req.body.user = req.user._id;
    Images.create(req.body)
        .then((image) => {
            console.log('Image added to database ', image);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(image);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = collectionRouter;