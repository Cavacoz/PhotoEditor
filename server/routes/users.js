var express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/UserController')
var cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

router.post('/api/signup', cors.corsWithOptions, userController.registerUser);
router.post('/api/login', cors.corsWithOptions, userController.loginUser)

module.exports = router;