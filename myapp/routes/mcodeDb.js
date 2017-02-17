var express = require('express');
var Promise = require('promise');
var path = require('path');
var gu = require('../scripts/getFileTree.js');
var router = express.Router();
var mutil=require('mill-n-utils');
var sqlite=require("mill-sqlite-utils");
var dbutil=sqlite.base;
var db=dbutil.getdb(path.join(__dirname,"../catch/mcode.db"));

router.get('/',function (req,res,next) {
	/*console.log("1111111");
	var promise=dbutil.insertObj(db,"mcode",{
		"name": "maven",
		"parent_id": 1,
		"is_leaves": 0
	});
	promise.then(function (data) {
		res.send(data);
	},function (err) {
		res.json(err);
	})*/
	var promise=dbutil.delete(db,"delete from mcode where id=?",{id:7});
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
router.post('/update_code',function (req,res,next) {

	// var promise=dbutil.update(db,"update mcode set code = ?, config = ? where id = ?",req.body.data);
	var promise=new Promise(function  (resolve,reject) {
		db.run("update mcode set code = ?, config = ? where id = ?", [req.body.data.code, req.body.data.config, req.body.data.id],
	    function(err) {
	        if (err) {
	            console.log(err);
	            reject(err);
	        } else {
	            resolve(1);
	        }
	    });
	});
	

	promise.then(function (data) {
		res.send(data);
	},function (err) {
		res.send(err);
	})
});
router.get('/delete_code/:delId',function (req,res,next) {
	console.log("bb",req.params.delId);
	var promise=dbutil.delete(db,"delete mcode where id=?",{id:req.params.delId});
	promise.then(function (data) {
		res.send(data);
	},function (err) {
		res.send(err);
	})
});

module.exports = router;