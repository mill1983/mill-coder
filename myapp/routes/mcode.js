var express = require('express');
var router = express.Router();
var mutil=require('mill-n-utils');
var path=require('path');
var sqlite=require("mill-sqlite-utils");
var dbutil=sqlite.base;
var db=dbutil.getdb(path.join(__dirname,"../catch/mcode.db"));

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
router.get("/getmcodes",function (req,res) {
	var pro=dbutil.getAll(db,"SELECT mcode.id, mcode.name, mcode.parent_id, mcode.is_leaves FROM mcode",{});
	pro.then(function (data) {
		res.json(data);
	});
	
})
module.exports = router;
