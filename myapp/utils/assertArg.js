var model="develop";
var mustParam=function (args,must) {
	if(!Array.isArray(must))throw "参数要求必须是数组";
}
module.exports={
	assertMustParam:mustParam
}