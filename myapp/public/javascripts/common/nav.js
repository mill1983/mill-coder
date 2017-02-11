define(['app'],function (app) {
	app.directive('millNav',function () {
		return{
			restrict:"AE",
			templateUrl:"/html/common/nav.html",
			replace:true,
			scope:{
				data:"=datanav"
			}
		}
	});
})