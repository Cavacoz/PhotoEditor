var express = require('express');
var ImageKit = require('imagekit');

const authenticate = require('../authenticate')

const bodyParser = require('body-parser');
var User = require('../models/user');
var cors = require('./cors');
var Images = require('../models/collection');

var collectionRouter = express.Router();
collectionRouter.use(bodyParser.json());

var imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/nny7nrtku',
    publicKey: 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro=',
    privateKey: 'private_uSBxTRxiUf3VdwK4L2cx9OLpWlI='
});

collectionRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

collectionRouter.get('/auth', cors.corsWithOptions, function (req, res, next) {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

collectionRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {

    Images.find({ user: req.user._id })
        .then((imgs) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(imgs);
        }, (err) => next(err))
        .catch((err) => next(err));
});

collectionRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    req.body.user = req.user._id;
    imagekit.upload({
        file: req.body.imgData, //required
        fileName: "my_file_name.png",   //required
    }).then(response => {
        req.body.url = response.url
        Images.create(req.body)
            .then((image) => {
                console.log('Image added to database ', image);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(image);
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
});

collectionRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    Images.deleteOne({ url: req.body.url }, function (err, obj) {
        if (err) throw err;
        console.log('1 document deleted');
        console.log(obj);
    });
    // change async/await promise
});

module.exports = collectionRouter;