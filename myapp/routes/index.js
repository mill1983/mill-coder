var express = require('express');
var router = express.Router();
var mutil=require('mill-n-utils');

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(mutil.fs.exists(req.params.url)){
	// 	var content=mutil.fs.read(req.params.url);
	// 	res.render('index', { title: 'Express' , content:content});
	// }
		res.render('index', { title: 'Express' });
});

module.exports = router;
