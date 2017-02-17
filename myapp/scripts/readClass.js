var fs=require("fs");
var Pormise=require("promise"),
xml2js = require('xml2js');
var obj={};


var readStream = fs.readFileSync('./res.xml');

var parser = new xml2js.Parser();
parser.parseString(readStream, function (err, result) {
    if(err){
        console.log(err);return;
    }
    console.dir(result);
});


module.exports=obj;