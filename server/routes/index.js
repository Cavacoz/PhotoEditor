var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  //res.sendFile('index', { title: 'Express' });
  //res.send('index', { title: 'Express' });
});

module.exports = router;
