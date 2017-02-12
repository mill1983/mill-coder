define(['app'],function (app) {
	app.service('doPath',["$location",function (location) {
		this.goPath=function (node,i) {
			var path=location.path();
			var pathArr=path.substring(1).split("/");
			pathArr[i]=node.path.replace(/\//g,"¿");
			path="/"+pathArr.join("/");
			location.path(path);
		}
	}])
})