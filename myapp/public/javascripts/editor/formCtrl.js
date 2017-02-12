define(['app'],function (app) {
	app.controller('formCtrl',['$scope','doPath',function (scope,doPath) {
		scope.data={
			root:"/Users/mill/Documents/node/web/mill-coder/myapp/public",
			seach:""
		};
		scope.search=function () {
			doPath.goPath({path:this.data.root.replace(/\//g,"¿")},1);
			

		}
	}])
})