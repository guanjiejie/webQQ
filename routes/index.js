var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./demo/index', { title: 'webQQ', id: req.param("id") });
});

module.exports = router;
