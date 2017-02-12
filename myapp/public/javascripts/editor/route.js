define(['app'],function (app) {
	app.config(['$routeProvider',
		function (route) {
		route
		.when("/:url/:root",{
			controller:'IndexCtrl',
			templateUrl:'/html/editor/index.html'
		})
		.when('/code/:key', {
			controller: 'EditorCtrl',
			templateUrl: '/html/index/edit.html'
		}).otherwise({
			redirectTo: '/temp/aa'
		});
	}]);
})