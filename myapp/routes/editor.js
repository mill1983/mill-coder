var express = require('express');
var gu = require('../scripts/getFileTree.js');
var router = express.Router();
var mutil=require('mill-n-utils');

router.get('/',function (req,res,next) {
	res.render('editor');
});
router.get('/filetree',function (req,res,next) {
	var result=gu.walk("/Users/mill/Documents/node/web/mill-coder/myapp/public",null)
	res.json(result);
})
module.exports = router;
