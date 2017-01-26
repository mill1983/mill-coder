define(['app'],function (app) {
	app.directive('millNav',function () {
		return{
			restrict:"AE",
			templateUrl:"/html/common/nav.html",
			replace:true,
			// controller:function ($scope) {
			// 	$scope.data={
			// 		brand:{
			// 			val:"liujian",
			// 			url:"http://www.baidu.com"
			// 		}
			// 	}
			// },
			scope:{
				data:"=datanav"
			}
		}
	});
})