var express = require('express');
var router = express.Router();
var mutil=require('mill-n-utils');
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(mutil.fs.exists(req.params.url)){
	// 	var content=mutil.fs.read(req.params.url);
	// 	res.render('index', { title: 'Express' , content:content});
	// }
		res.render('index', { title: 'Express' });
});
function filldir(dir,cb) {
	fs.readdir(dir,function (err,files) {
		if (err) {
			return console.error(err);
		}
		var result=[];
		// 遍历目录,打印文件名
		files.forEach(function(file) {
			var temppath=dir+"/"+file;
			fs.stat(temppath,function (err, stats) {
				var obj={};
				obj.title=file;
				obj.url=temppath;
				if(stats.isDirectory()){
					cb(temppath,file,true);
					obj.items=filldir(temppath,cb);
				}else{
					cb(temppath,file);
				}
				console.log(result);
				result.push(obj);
			})
			
		});
		return result;
	})
}
router.get("/files/tree",function (req,res,next) {
	var result= filldir("/Users/mill/Documents/node/web/",function (path,file,isDir){
	});
	
	res.json(result);
})

module.exports = router;
