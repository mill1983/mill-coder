define(['app'],function (app) {
	app.config(['$routeProvider',
		function (route) {
		route
		.when("/",{
			controller:'IndexCtrl',
			templateUrl:'/html/editor/index.html'
		})
		.when('/editor/:content', {
			controller: 'EditorCtrl',
			templateUrl: '/html/index/edit.html'
		}).otherwise({
			redirectTo: '/'
		});
	}]);
})