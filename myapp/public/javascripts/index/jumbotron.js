define([
	'app',
	],function (app) {
	app.directive("jumbotron",function () {
		return {
			restrict:"AE",
			templateUrl:"/html/common/jumbotron.html",
			replace:true,
			scope:{
				data:"=data"
			}	
		}
	})
})