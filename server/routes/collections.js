var express = require('express');

const authenticate = require('../authenticate')

const bodyParser = require('body-parser');
var cors = require('./cors');

const imageController = require('../controllers/ImageController')

var collectionRouter = express.Router();
collectionRouter.use(bodyParser.json());

collectionRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

collectionRouter.get('/auth', cors.corsWithOptions, imageController.authImageKit);

collectionRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, imageController.getImages);

collectionRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, imageController.postImage);

collectionRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, imageController.deleteImage);

module.exports = collectionRouter;