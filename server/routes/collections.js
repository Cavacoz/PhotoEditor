var express = require('express');
var ImageKit = require('imagekit');

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

collectionRouter.get('/', cors.corsWithOptions, function (req, res, next) {
});

collectionRouter.post('/', cors.corsWithOptions, function (req, res, next) {
});

module.exports = collectionRouter;