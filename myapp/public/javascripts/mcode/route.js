define(['app'],function (app) {
	app.config(['$routeProvider',
		function (route) {
		route
		.when("/",{
			controller:'IndexCtrl',
			templateUrl:'/html/mcode/index.html'
		})
		.when('/code/:key', {
			controller: 'EditorCtrl',
			templateUrl: '/html/index/edit.html'
		}).otherwise({
			redirectTo: '/'
		});
	}]);
})