var gu=require('../scripts/getFileTree.js');
var async=require('async');
var obj={};
gu.walk("/Users/mill/Documents/node/web/mill-coder/myapp/public/javascripts",obj)

console.log(obj)


