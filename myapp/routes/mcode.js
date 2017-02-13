var express = require('express');
var router = express.Router();
var mutil=require('mill-n-utils');

router.get('/',function (req,res,next) {
	res.render('mcode');
});
//创建代码片段
router.post('/create/code',function (req,res,next) {

	try{
		var code=mutil.ejs.render(req.body.tpl,JSON.parse(req.body.conf));
		res.send(code);
	}catch(err){
		res.json(err);
	}


});
module.exports = router;
