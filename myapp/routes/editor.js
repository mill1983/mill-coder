var express = require('express');
var gu = require('../scripts/getFileTree.js');
var router = express.Router();
var mutil=require('mill-n-utils');

router.get('/',function (req,res,next) {
	res.render('editor');
});
router.post('/filetree',function (req,res,next) {
	try{
		var murl=req.body.url.replace(/¿/g,"/");
		console.log(murl)
		var result=gu.walk(murl,[
			'bower_components','node_modules'
			]);
		// mutil.mfs.writeJson("../catch/"+req.body.url.replace(/¿\\/g,"_"),result);
		res.json(result);


	}catch(err){
		console.log(err)
		res.json({})
	}
});
router.post('/content',function (req,res,next) {
	if(!req.body.url)res.send("没有内容");
	var murl=req.body.url.replace(/¿/g,"/");
	if(mutil.fs.exists(murl)){
		res.send(mutil.fs.read(murl));
	}else{
		res.send(murl)
	}
	
});
router.post('/save',function (req,res,next) {
	if(!req.body.url)res.send("地址不能为空");
	var murl=req.body.url.replace(/¿/g,"/");
	if(mutil.fs.exists(murl)){
		mutil.mfs.write(murl,req.body.content)
		res.send("保存成功");
	}else{
		res.send(murl)
	}
	
})
module.exports = router;
