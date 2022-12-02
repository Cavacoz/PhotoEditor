var express = require('express');
const bodyParser = require('body-parser');
var cors = require('./cors');

const authenticate = require('../authenticate')

const imageToEmailController = require('../controllers/ImageToEmailController')

var imageToEmailRouter = express.Router();
imageToEmailRouter.use(bodyParser.json());

imageToEmailRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

imageToEmailRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, imageToEmailController.sendEmail);

module.exports = imageToEmailRouter;