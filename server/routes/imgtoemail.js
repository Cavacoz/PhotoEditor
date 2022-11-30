var express = require('express');
const bodyParser = require('body-parser');
var cors = require('./cors');

const authenticate = require('../authenticate')


var imageToEmailRouter = express.Router();
imageToEmailRouter.use(bodyParser.json());

imageToEmailRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

imageToEmailRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    try {
        const user = req.user;
        console.log(user);
        authenticate.sendEmail(user.username, req.body.imgData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json('fine');
    } catch (error) {
        throw error;
    }

});

module.exports = imageToEmailRouter;