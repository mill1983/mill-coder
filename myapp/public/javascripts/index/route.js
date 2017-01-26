define(["app"],function (app) {
	app.config(['$routeProvider',
		function (route) {
		route
		.when("/",{
			controller:'IndexCtrl',
			templateUrl:'/html/index/index.html'
		})
		.when('/inbox/:name', {
			controller: 'InboxController',
			template: '\
	        <h1>欢迎你, {{ name }}</h1>\
	        <a href="#/">返回</a>\
	      '
		}).otherwise({
			redirectTo: '/'
		});
	}]);
})