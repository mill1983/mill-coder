var express = require('express');
var router = express.Router();
var mutil=require('mill-n-utils');

router.get('/',function (req,res,next) {
	res.render('mcode');
});

module.exports = router;
