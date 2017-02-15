var express = require('express');
var path = require('path');
var gu = require('../scripts/getFileTree.js');
var router = express.Router();
var mutil=require('mill-n-utils');
var sqlite=require("mill-sqlite-utils");
var dbutil=sqlite.base;
var db=dbutil.getdb(path.join(__dirname,"../catch/mcode.db"));

router.get('/',function (req,res,next) {
	console.log("1111111")
	var promise=dbutil.insertObj(db,"mcode",{
		"name": "maven",
		"parent_id": 1,
		"is_leaves": 0
	});
	promise.then(function (data) {
		res.send(data);
	},function (err) {
		res.json(err);
	})
	// res.send('editor');
});
router.post('/add_code',function (req,res,next) {
	var promise=dbutil.insertObj(db,"mcode",req.body.data);
	promise.then(function (data) {
		res.send(data);
	},function (err) {
		res.json(err);
	})
});

module.exports = router;
