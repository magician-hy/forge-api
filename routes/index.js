var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    logo: '🔥',
    name: '健身',
    description: 'Forge myself into a weapon.',
  });
});

module.exports = router;
